import { create } from 'zustand';
import { Batch, Pagination } from '@/features/batches/types/batch';

interface BatchState {
    batches: Batch[];
    pagination: Pagination | null;
    hasLoaded: boolean;
    lastFilters: {
        programId?: string;
        institutionId?: string;
        page?: number;
    } | null;
}

interface BatchActions {
    setBatches: (batches: Batch[], pagination: Pagination | null, filters: BatchState['lastFilters']) => void;
    addBatch: (batch: Batch) => void;
    updateBatch: (batch: Batch) => void;
    deleteBatch: (id: string) => void;
    clearBatches: () => void;
}

export const useBatchStore = create<BatchState & BatchActions>((set) => ({
    batches: [],
    pagination: null,
    hasLoaded: false,
    lastFilters: null,

    setBatches: (batches, pagination, lastFilters) => set({
        batches,
        pagination,
        hasLoaded: true,
        lastFilters
    }),

    addBatch: (batch) => set((state) => ({
        batches: [batch, ...state.batches]
    })),

    updateBatch: (batch) => set((state) => ({
        batches: state.batches.map((b) => b.id === batch.id ? batch : b)
    })),

    deleteBatch: (id) => set((state) => ({
        batches: state.batches.filter((b) => b.id !== id)
    })),

    clearBatches: () => set({
        batches: [],
        pagination: null,
        hasLoaded: false,
        lastFilters: null
    })
}));
