import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(persist(
    (set) => ({
        tasks: [],
        user: {
            level: 0,
            totalXp: 0,
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

            console.log('task has been toggled', id)

            let task = state.tasks.find(task => task.id === id);

            if (!task) return state;

            const isCompleted = !task.isCompleted

            console.log('task hes been completed?', isCompleted)

            if (isCompleted) {

                let user = { ...state.user };

                user.currentXp += task.xp;
                user.totalXp += task.xp;

                while (user.currentXp >= user.xpToNextLevel) {
                    user.level += 1;
                    user.currentXp = user.currentXp - user.xpToNextLevel;
                    user.xpToNextLevel = Math.floor(user.xpToNextLevel * 1.2);
                }

                return {
                    tasks: state.tasks.map(t => t.id === id ? { ...t, isCompleted: true } : t),
                    user
                }
            }

            if (!isCompleted) {
                let user = { ...state.user };
                const taskXp = task.xp;


                user.currentXp -= taskXp;
                user.totalXp -= taskXp;

                while (user.currentXp < 0 && user.level >= 0) {
                    user.level -= 1;
                    user.currentXp += user.xpToNextLevel;
                    user.xpToNextLevel = Math.floor(user.xpToNextLevel / 1.2);
                }

                if (user.currentXp < 0) {
                    user.currentXp = 0;
                }

                if (user.totalXp < 0) {
                    user.totalXp = 0;
                }



                return {
                    tasks: state.tasks.map(t => t.id === id ? { ...t, isCompleted: false } : t),
                    user
                }
            }
        }),

        deleteTask: (id) => set((state) => ({
            tasks: state.tasks.filter(task => task.id !== id)
        }))
    }),
    {
        name: 'zenstack-storage'
    }
))

export default useStore