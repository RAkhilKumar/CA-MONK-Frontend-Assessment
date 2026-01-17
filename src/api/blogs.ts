import axios from 'axios';
import { Blog } from '../types';

const API_URL = 'http://localhost:3001/blogs';

// Get all blogs
export const fetchBlogs = async (): Promise<Blog[]> => {
  const { data } = await axios.get(API_URL);
  // Sort by date (newest first)
  return data.sort((a: Blog, b: Blog) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

// Get single blog
export const fetchBlogById = async (id: string): Promise<Blog> => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};

// Create blog
export const createBlog = async (newBlog: Omit<Blog, 'id'>): Promise<Blog> => {
  const { data } = await axios.post(API_URL, newBlog);
  return data;
};