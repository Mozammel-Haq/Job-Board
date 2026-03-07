export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  category: string;
  employment_type: string;
  salary?: string;
  description: string;
  responsibilities?: string[];
  requirements?: string[];
  benefits?: string[];
  logo?: string;
  is_active: boolean;
  applications_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Application {
  id: number;
  job_id: number;
  job?: Job;
  name: string;
  email: string;
  resume_url: string;
  cover_note: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  created_at: string;
  updated_at: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
  created_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  links: {
    first: string;
    last: string;
    prev: string | null;
    next: string | null;
  };
  meta: {
    current_page: number;
    from: number;
    last_page: number;
    path: string;
    per_page: number;
    to: number;
    total: number;
  };
}