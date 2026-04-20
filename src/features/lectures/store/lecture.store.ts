import { create } from 'zustand';
import { Lecture, Pagination } from '@/features/lectures/types/lecture';

interface LectureState {
    lectures: Lecture[];
    pagination: Pagination | null;
    hasLoaded: boolean;
    lastFilters: {
        subjectId?: string;
        batchSubjectId?: string;
        page?: number;
    } | null;
}

interface LectureActions {
    setLectures: (lectures: Lecture[], pagination: Pagination | null, filters: LectureState['lastFilters']) => void;
    deleteLecture: (id: string) => void;
    clearLectures: () => void;
}

export const useLectureStore = create<LectureState & LectureActions>((set) => ({
    lectures: [],
    pagination: null,
    hasLoaded: false,
    lastFilters: null,

    setLectures: (lectures, pagination, lastFilters) => set({
        lectures,
        pagination,
        hasLoaded: true,
        lastFilters
    }),

    deleteLecture: (id) => set((state) => ({
        lectures: state.lectures.filter((l) => l.id !== id)
    })),

    clearLectures: () => set({
        lectures: [],
        pagination: null,
        hasLoaded: false,
        lastFilters: null
    })
}));
