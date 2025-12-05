import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(persist(
    (set) => ({
        tasks: [],
        user: {
            level: 0,
            currentXp: 0,
            totalXp: 0,
            xpToNextLevel: 100,
            streak: 0,
            history: {
                lastDate: null,
                timeLine: new Map()
            }

        },
        levelUpCache: [100],
        addTask: (task) => {
            useStore.getState().historyDateManager()
            set((state) => ({



                tasks: [...state.tasks, {
                    ...task,
                    id: Date.now(),
                    isCompleted: false,
                    xp: task.xp || 0
                }]
            }))
        },

        toggleTask: (id) => {
            useStore.getState().historyDateManager()

            set((state) => {

                let task = state.tasks.find(task => task.id === id);

                let date = new Date().toISOString().split('T')[0];

                let timeLine = state.user.history.timeLine;

                let currentDateTimeline = { ...timeLine.get(date) };

                if (!task) return state;

                const isCompleted = !task.isCompleted
                let user = { ...state.user };
                let levelUpCache = [...state.levelUpCache];

                if (isCompleted) {


                    user.currentXp += task.xp;
                    user.totalXp += task.xp;

                    while (user.currentXp >= user.xpToNextLevel) {
                        user.level += 1;
                        user.currentXp = user.currentXp - user.xpToNextLevel;
                        user.xpToNextLevel = Math.floor(user.xpToNextLevel * 1.2);

                        if (levelUpCache[user.level] === undefined) {
                            levelUpCache.push(user.xpToNextLevel);
                        }
                    }



                    return {
                        tasks: state.tasks.map(t => t.id === id ? { ...t, isCompleted: true } : t),
                        user: {
                            ...state.user,
                            history: {
                                ...state.user.history,
                                timeLine: timeLine.set(date, {
                                    ...currentDateTimeline,
                                    tasksDone: currentDateTimeline.tasksDone + 1,
                                    xp: currentDateTimeline.xp + task.xp
                                })
                            }
                        },
                        levelUpCache
                    }
                }

                if (!isCompleted) {

                    user.currentXp -= task.xp;

                    user.totalXp -= task.xp

                    user.totalXp = Math.max(0, user.totalXp)

                    while (user.currentXp < 0 && user.level >= 0) {
                        user.level -= 1;
                        user.xpToNextLevel = levelUpCache[user.level]
                        user.currentXp = user.xpToNextLevel + user.currentXp;
                    }

                    user.currentXp = Math.max(0, user.currentXp)

                    return {
                        tasks: state.tasks.map(t => t.id === id ? { ...t, isCompleted: false } : t),
                        user: {
                            ...state.user,
                            history: {
                                ...state.user.history,
                                timeLine: timeLine.set(date, {
                                    ...currentDateTimeline,
                                    tasksDone: currentDateTimeline.tasksDone - 1,
                                    xp: currentDateTimeline.xp - task.xp
                                })
                            }
                        },
                        levelUpCache
                    }
                }
            })
        },

        historyDateManager: () => set((state) => {
            let currentDate = new Date().toISOString().split('T')[0];
            let lastManagedDate = state.user.history.lastDate;
            let newTimeLine = new Map(state.user.history.timeLine);

            if (currentDate !== lastManagedDate) {

                return {
                    user: {
                        ...state.user,
                        history: {
                            ...state.user.history,
                            lastDate: currentDate,
                            timeLine: newTimeLine.set(currentDate, {
                                xp: 0,
                                tasksDone: 0,
                                tasksUndone: 0
                            })
                        }
                    }
                }

            }

            return {
                user: {
                    ...state.user,
                    history: {
                        ...state.user.history,
                        timeLine: newTimeLine
                    }
                }
            }
        }),

        timeLineManager: (date, task, isCompleted) => {
            let timeLine = useStore.getState().user.history.timeLine;
            let taskDone = timeLine.get(date).tasksDone;
            let taskUndone = timeLine.get(date).tasksUndone;
            let xp = timeLine.get(date).xp;

            if (isCompleted) {
                taskDone += 1;
                xp += task.xp;
            } else {
                taskUndone += 1;
            }

            timeLine.set(date, {
                tasksDone: taskDone,
                tasksUndone: taskUndone,
                xp: xp
            })

            set((state) => ({
                user: {
                    ...state.user,
                    history: {
                        ...state.user.history,
                        timeLine: timeLine
                    }
                }
            }))
        },

        deleteTask: (id) => {

            useStore.getState().historyDateManager()

            set((state) => ({
                tasks: state.tasks.filter(task => task.id !== id)
            }))
        },

        resetStore: () => set((state) => ({
            tasks: [],
            user: {
                level: 0,
                currentXp: 0,
                totalXp: 0,
                xpToNextLevel: 100,
                streak: 0,
            },
            levelUpCache: [100],
        }))
    }),
    {
        name: 'zenstack-storage'
    }
))

export default useStore