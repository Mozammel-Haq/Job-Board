const API_BASE_URL = typeof window !== 'undefined'
  ? '/api-proxy'
  : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api');
import type { Application, PaginatedResponse, Job, User } from '@/lib/types';

interface ApiResponse<T = any> {
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

class ApiService {
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const token = this.getAuthToken();

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` }),
      ...options.headers,
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw {
          status: response.status,
          message: data.message || 'An error occurred',
          errors: data.errors,
        };
      }

      return data;
    } catch (error: any) {
      throw error;
    }
  }

  // Auth endpoints
  async register(data: { name: string; email: string; password: string; password_confirmation: string }): Promise<any> {
    return this.request('/register', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async login(data: { email: string; password: string }): Promise<{ token: string; user: User }> {
    return this.request<any>('/login', {
      method: 'POST',
      body: JSON.stringify(data),
    }) as unknown as Promise<{ token: string; user: User }>;
  }

  async logout() {
    return this.request('/logout', {
      method: 'POST',
    });
  }

  async getUser() {
    return this.request('/user');
  }

  // Job endpoints
  async getJobs(params?: {
    search?: string;
    category?: string;
    location?: string;
    employment_type?: string;
    page?: number;
    per_page?: number;
  }) {
    const queryString = params ? '?' + new URLSearchParams(
      Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => [k, String(v)])
    ).toString() : '';

    return this.request<Job[]>(`/jobs${queryString}`) as unknown as Promise<PaginatedResponse<Job>>;
  }

  async getJob(id: string) {
    return this.request<Job>(`/jobs/${id}`);
  }

  async getFeaturedJobs() {
    return this.request<Job[]>('/jobs/featured');
  }

  async getLatestJobs() {
    return this.request<Job[]>('/jobs/latest');
  }

  async getJobFilters(): Promise<{ categories: { name: string; count: number }[]; locations: string[]; employment_types: string[] }> {
    const response = await this.request<{ categories: { name: string; count: number }[]; locations: string[]; employment_types: string[] }>('/jobs/filters');
    return response.data!;
  }

  async createJob(data: any) {
    return this.request('/admin/jobs', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateJob(id: string, data: any) {
    return this.request(`/admin/jobs/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteJob(id: string) {
    return this.request(`/admin/jobs/${id}`, {
      method: 'DELETE',
    });
  }

  async getAdminJobs(params?: {
    search?: string;
    include_inactive?: boolean;
    page?: number;
    per_page?: number;
  }) {
    const queryString = params ? '?' + new URLSearchParams(
      Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => [k, String(v)])
    ).toString() : '';

    return this.request<Job[]>(`/admin/jobs${queryString}`) as unknown as Promise<PaginatedResponse<Job>>;
  }

  async getJobStatistics() {
    return this.request<any>('/admin/jobs/statistics');
  }

  async getWeeklyStats() {
    return this.request<any[]>('/admin/jobs/weekly-stats');
  }
  async getMonthlyStats() {
    return this.request<any[]>('/admin/jobs/monthly-stats');
  }
  async getYearlyStats() {
    return this.request<any[]>('/admin/jobs/yearly-stats');
  }
  async uploadJobLogo(file: File) {
    const token = this.getAuthToken();
    const formData = new FormData();
    formData.append('logo', file);
    const response = await fetch(`${API_BASE_URL}/admin/jobs/logo`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
      body: formData,
    });
    const data = await response.json();
    if (!response.ok) {
      throw {
        status: response.status,
        message: data.message || 'Failed to upload logo',
        errors: data.errors,
      };
    }
    return data;
  }
  // Application endpoints
  async submitApplication(data: {
    job_id: number;
    name: string;
    email: string;
    resume_url: string;
    cover_note: string;
  }) {
    // Map client field to server expected key
    const payload = {
      qhjob_id: data.job_id,
      name: data.name,
      email: data.email,
      resume_url: data.resume_url,
      cover_note: data.cover_note,
    };
    return this.request('/applications', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  async getApplications(params?: {
    job_id?: number;
    status?: string;
    search?: string;
    page?: number;
    per_page?: number;
  }) {
    const queryString = params ? '?' + new URLSearchParams(
      Object.entries(params)
        .filter(([_, v]) => v !== undefined && v !== null && v !== '')
        .map(([k, v]) => [k, String(v)])
    ).toString() : '';

    return this.request<Application[]>(`/admin/applications${queryString}`) as unknown as Promise<PaginatedResponse<Application>>;
  }

  async updateApplicationStatus(id: number, status: string) {
    return this.request(`/admin/applications/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
  }

  async deleteApplication(id: number) {
    return this.request(`/admin/applications/${id}`, {
      method: 'DELETE',
    });
  }

  async getJobApplications(jobId: string) {
    return this.request(`/admin/jobs/${jobId}/applications`);
  }

  getStorageUrl(url: string | null | undefined): string {
    if (!url) return '';
    if (typeof window === 'undefined') return url;

    // If it's already a relative path or an SVG from the public dir, return as is
    if (!url.startsWith('http')) return url;

    // Check if the URL contains '/storage/' to identify backend assets
    const storageIndex = url.indexOf('/storage/');
    if (storageIndex !== -1) {
      return '/storage-proxy/' + url.substring(storageIndex + 9);
    }

    return url;
  }
}

export const api = new ApiService();
