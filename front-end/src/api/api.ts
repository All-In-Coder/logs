import axios from 'axios';

// Automatically detect the API base URL based on the current hostname
const getApiBaseUrl = () => {
  const hostname = window.location.hostname;

  // If running on localhost, use localhost for API
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:8000/api';
  }

  // If running on network IP, use the same IP for API
  return `http://${hostname}:8000/api`;
};

const API_BASE_URL = getApiBaseUrl();

export interface DiaryEntry {
  id: string;
  date: string;
  time: string;
  mood: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
  updated_at?: string;
}

export interface CreateDiaryEntryRequest {
  date: string;
  time: string;
  mood: string;
  title: string;
  content: string;
  tags?: string[];
}

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const fetchEntries = async (date?: string, mood?: string): Promise<DiaryEntry[]> => {
  const response = await api.get<DiaryEntry[]>('/entries', {
    params: { date, mood },
  });
  return response.data;
};

export const fetchEntryById = async (id: string): Promise<DiaryEntry> => {
  const response = await api.get<DiaryEntry>(`/entries/${id}`);
  return response.data;
};

export const createEntry = async (entry: CreateDiaryEntryRequest): Promise<DiaryEntry> => {
  const response = await api.post<DiaryEntry>('/entries', entry);
  return response.data;
};

export const updateEntry = async (id: string, entry: Partial<CreateDiaryEntryRequest>): Promise<DiaryEntry> => {
  const response = await api.put<DiaryEntry>(`/entries/${id}`, entry);
  return response.data;
};

export const deleteEntry = async (id: string): Promise<void> => {
  await api.delete(`/entries/${id}`);
};

export const fetchEntriesByDateRange = async (startDate: string, endDate: string): Promise<DiaryEntry[]> => {
  const response = await api.get<DiaryEntry[]>('/entries/date-range', {
    params: { start_date: startDate, end_date: endDate },
  });
  return response.data;
};

export const fetchEntriesByMood = async (mood: string): Promise<DiaryEntry[]> => {
  const response = await api.get<DiaryEntry[]>(`/entries/mood/${mood}`);
  return response.data;
};

export default api;
