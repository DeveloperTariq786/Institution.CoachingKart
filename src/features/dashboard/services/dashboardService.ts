import apiClient from "@/core/api/axios/client";
import { INSTITUTION_ENDPOINTS } from "@/core/api/endpoint/endpoints";

export interface DashboardStats {
  programs: number;
  courses: number;
  students: number;
  batches: number;
}

export interface RecentLecture {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: number;
  createdAt: string;
  batchSubject: {
    batch: {
      id: string;
      name: string;
      program: {
        id: string;
        name: string;
        course: {
          id: string;
          name: string;
        };
      };
    };
    subject: {
      id: string;
      name: string;
    };
  };
  faculty: {
    id: string;
    name: string;
    profileImage: string;
  };
}

const dashboardService = {
  getStats: async (): Promise<DashboardStats> => {
    const response = await apiClient.get<{ success: boolean; data: DashboardStats }>(
      INSTITUTION_ENDPOINTS.DASHBOARD_STATS
    );
    return response.data.data;
  },

  getRecentLectures: async (limit: number = 10): Promise<RecentLecture[]> => {
    const response = await apiClient.get<{ success: boolean; data: RecentLecture[] }>(
      INSTITUTION_ENDPOINTS.RECENT_LECTURES,
      { params: { limit } }
    );
    return response.data.data;
  },
};

export default dashboardService;
