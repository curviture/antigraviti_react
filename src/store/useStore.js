import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(persist(
    (set) => ({
        tasks: [],
        user: {
            level: 1,
            currentXp: 0,
            xpToNextLevel: 100,
            streak: 0,

        },

        addTask: (task) => set((state) => ({
            tasks: [...state.tasks, {
                ...task,
                id: Date.now(),
                isCompleted: false,
            }]
        })),

        toggleTask: (id) => set((state) => {

            let task = state.tasks.find(task => task.id === id);

            if (!task) return state;

            const isCompleted = !task.isCompleted

            if (isCompleted) {

                let user = { ...state.user };

                user.currentXp += task.xp;

                while (user.currentXp >= user.xpToNextLevel) {
                    user.level += 1;
                    user.currentXp = user.currentXp - user.xpToNextLevel;
                    user.xpToNextLevel = Math.floor(user.xpToNextLevel * 1.2);
                }

                return {
                    tasks: state.tasks.map(t => t.id === id ? { ...t, isCompleted: true } : t),
                    user
                }
            } else {
                return {
                    tasks: state.tasks.map(t => t.id === id ? { ...t, isCompleted: false } : t),
                    user: state.user
                }
            }
        }),
    }),
    {
        name: 'zenstack-storage'
    }
))

export default useStore