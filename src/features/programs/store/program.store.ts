import { create } from 'zustand';
import { Program, Pagination } from '../types/program';

interface ProgramState {
    programs: Program[];
    pagination: Pagination | null;
    hasLoaded: boolean;
    lastFilters: {
        courseId?: string;
        institutionId?: string;
        page?: number;
    } | null;
}

interface ProgramActions {
    setPrograms: (programs: Program[], pagination: Pagination | null, filters: ProgramState['lastFilters']) => void;
    addProgram: (program: Program) => void;
    removeProgram: (id: string) => void;
    clearPrograms: () => void;
}

export const useProgramStore = create<ProgramState & ProgramActions>((set) => ({
    programs: [],
    pagination: null,
    hasLoaded: false,
    lastFilters: null,

    setPrograms: (programs, pagination, lastFilters) => set({
        programs,
        pagination,
        hasLoaded: true,
        lastFilters
    }),

    addProgram: (program) => set((state) => ({
        programs: [program, ...state.programs]
    })),

    removeProgram: (id) => set((state) => ({
        programs: state.programs.filter((p) => p.id !== id)
    })),

    clearPrograms: () => set({
        programs: [],
        pagination: null,
        hasLoaded: false,
        lastFilters: null
    })
}));
