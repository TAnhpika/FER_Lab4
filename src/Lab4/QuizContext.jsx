import { createContext, useContext } from "react";

export const QuizContext = createContext(null);

export function useQuizContext() {
    const ctx = useContext(QuizContext);
    if (!ctx) {
        throw new Error("useQuizContext must be used within a QuizProvider");
    }
    return ctx;
}
