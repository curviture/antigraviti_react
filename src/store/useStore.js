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

        },
        levelUpCache: [100],
        addTask: (task) => set((state) => ({



            tasks: [...state.tasks, {
                ...task,
                id: Date.now(),
                isCompleted: false,
                xp: task.xp || 0
            }]
        })),

        toggleTask: (id) => set((state) => {

            let task = state.tasks.find(task => task.id === id);

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
                    user,
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
                    user,
                    levelUpCache
                }
            }
        }),

        deleteTask: (id) => set((state) => ({
            tasks: state.tasks.filter(task => task.id !== id)
        })),

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