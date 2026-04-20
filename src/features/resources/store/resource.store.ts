import { create } from 'zustand';
import { Resource } from '../types';

interface ResourceState {
    resources: Resource[];
    hasLoaded: boolean;
    lastLectureId: string | null;
}

interface ResourceActions {
    setResources: (resources: Resource[], lectureId: string) => void;
    addResource: (resource: Resource) => void;
    clearResources: () => void;
}

export const useResourceStore = create<ResourceState & ResourceActions>((set) => ({
    resources: [],
    hasLoaded: false,
    lastLectureId: null,

    setResources: (resources, lectureId) => set({
        resources,
        lastLectureId: lectureId,
        hasLoaded: true
    }),

    addResource: (resource) => set((state) => ({
        resources: [resource, ...state.resources]
    })),

    clearResources: () => set({
        resources: [],
        hasLoaded: false,
        lastLectureId: null
    })
}));
