import { create } from 'zustand';
import { Subject, Pagination } from '../types/subject';

interface SubjectState {
    subjects: Subject[];
    pagination: Pagination | null;
    hasLoaded: boolean;
    lastLoadedPage: number | null;
}

interface SubjectActions {
    setSubjects: (subjects: Subject[], pagination: Pagination | null, page: number) => void;
    addSubject: (subject: Subject) => void;
    updateSubject: (id: string, updatedSubject: Partial<Subject>) => void;
    removeSubject: (id: string) => void;
    clearSubjects: () => void;
}

export const useSubjectStore = create<SubjectState & SubjectActions>((set) => ({
    subjects: [],
    pagination: null,
    hasLoaded: false,
    lastLoadedPage: null,

    setSubjects: (subjects, pagination, page) => set({
        subjects,
        pagination,
        hasLoaded: true,
        lastLoadedPage: page
    }),

    addSubject: (subject) => set((state) => ({
        subjects: [subject, ...state.subjects]
    })),

    updateSubject: (id, updatedSubject) => set((state) => ({
        subjects: state.subjects.map((s) => s.id === id ? { ...s, ...updatedSubject } : s)
    })),

    removeSubject: (id) => set((state) => ({
        subjects: state.subjects.filter((s) => s.id !== id)
    })),

    clearSubjects: () => set({
        subjects: [],
        pagination: null,
        hasLoaded: false,
        lastLoadedPage: null
    })
}));
