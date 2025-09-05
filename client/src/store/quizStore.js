import { create } from "zustand";

export const useQuizStore = create((set) => ({
  quiz: null,
  setQuiz: (quiz) => set({ quiz }),
  clearQuiz: () => set({ quiz: null }),
}));
