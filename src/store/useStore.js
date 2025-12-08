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

                let timeLine = new Map(state.user.history.timeLine);

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
            let history = { ...state.user.history };

            // console.log('history in historyDateManager', history)

            let newTimeLine = new Map(history.timeLine);

            if (currentDate !== lastManagedDate) {

                newTimeLine.set(currentDate, {
                    xp: 0,
                    tasksDone: 0,
                    tasksUndone: 0
                })

                return {
                    user: {
                        ...state.user,
                        history: {
                            ...history,
                            lastDate: currentDate,
                            timeLine: newTimeLine
                        }
                    }
                }

            }

            return { ...state }
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
                history: {
                    lastDate: null,
                    timeLine: new Map()
                }
            },
            levelUpCache: [100],
        })),

        populateData: () => set((state) => {
            const today = new Date();
            const testTimeLine = new Map();
            let totalXp = 0;
            let currentXp = 0; // will recalculate
            let level = 0;
            let xpToNextLevel = 100;
            let levelUpCache = [100];
            let streak = 0;

            // Generate 30 days of data
            for (let i = 29; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(date.getDate() - i);
                const dateString = date.toISOString().split('T')[0];

                // Random stats for each day
                // 80% chance of doing tasks to create some gaps for streak testing
                if (Math.random() > 0.2) {
                    const tasksDone = Math.floor(Math.random() * 5) + 1; // 1 to 5 tasks
                    const dayXp = tasksDone * (Math.floor(Math.random() * 30) + 10); // Random XP per task

                    testTimeLine.set(dateString, {
                        xp: dayXp,
                        tasksDone: tasksDone,
                        tasksUndone: Math.floor(Math.random() * 2)
                    });

                    totalXp += dayXp;
                    currentXp += dayXp;
                    streak++; // distinctive logic needed for real streak calc, but this is simple for now
                } else {
                    testTimeLine.set(dateString, { xp: 0, tasksDone: 0, tasksUndone: 0 });
                    streak = 0;
                }

                // Simulate leveling up logic roughly
                while (currentXp >= xpToNextLevel) {
                    level++;
                    currentXp -= xpToNextLevel;
                    xpToNextLevel = Math.floor(xpToNextLevel * 1.2);
                    levelUpCache.push(xpToNextLevel);
                }
            }

            // Create some dummy current tasks
            const testTasks = [
                { id: Date.now() - 10000, title: "Refactor Authentication Flow", xp: 50, isCompleted: true },
                { id: Date.now() - 8000, title: "Design New Landing Page", xp: 30, isCompleted: false },
                { id: Date.now() - 6000, title: "Fix Navigation Bug", xp: 20, isCompleted: true },
                { id: Date.now() - 4000, title: "Write Unit Tests", xp: 15, isCompleted: false },
                { id: Date.now() - 2000, title: "Update Dependencies", xp: 10, isCompleted: false },
            ];

            // Add current tasks XP if completed
            testTasks.forEach(t => {
                if (t.isCompleted) {
                    totalXp += t.xp;
                    currentXp += t.xp;
                    while (currentXp >= xpToNextLevel) {
                        level++;
                        currentXp -= xpToNextLevel;
                        xpToNextLevel = Math.floor(xpToNextLevel * 1.2);
                        levelUpCache.push(xpToNextLevel);
                    }
                }
            });


            return {
                tasks: testTasks,
                user: {
                    level,
                    currentXp,
                    totalXp,
                    xpToNextLevel,
                    streak,
                    history: {
                        lastDate: today.toISOString().split('T')[0],
                        timeLine: testTimeLine
                    }
                },
                levelUpCache
            };
        })
    }),
    {
        name: 'zenstack-storage',
        storage: {
            getItem: (name) => {
                const str = localStorage.getItem(name);
                if (!str) return null;
                const existingValue = JSON.parse(str);
                return {
                    ...existingValue,
                    state: {
                        ...existingValue.state,
                        user: {
                            ...existingValue.state.user,
                            history: {
                                ...existingValue.state.user.history,
                                timeLine: new Map(
                                    Array.isArray(existingValue.state.user.history.timeLine)
                                        ? existingValue.state.user.history.timeLine
                                        : []
                                )
                            }
                        }
                    }
                }
            },
            setItem: (name, newValue) => {
                const str = JSON.stringify({
                    ...newValue,
                    state: {
                        ...newValue.state,
                        user: {
                            ...newValue.state.user,
                            history: {
                                ...newValue.state.user.history,
                                timeLine: Array.from(newValue.state.user.history.timeLine.entries())
                            }
                        }
                    }
                });
                localStorage.setItem(name, str);
            },
            removeItem: (name) => localStorage.removeItem(name),
        }
    }
))

export default useStore