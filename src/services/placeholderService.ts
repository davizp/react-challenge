import axios, { AxiosResponse } from 'axios';

export interface Post {
  userId: number;
  id: string;
  title: string;
  body: string;
};

export interface Comment {
  postId: string;
  id: number;
  name: string;
  email: string;
  body: string;
};

const baseURL = process.env.REACT_APP_API_URL || '';

class PlaceholderService {
  private httpService = axios.create({
    baseURL: `${baseURL}`,
  })

  fetchPosts(): Promise<AxiosResponse> {
    return this.httpService.get('/posts');
  }

  fetchComments(): Promise<AxiosResponse> {
    return this.httpService.get('/comments');
  }
}

export default new PlaceholderService();
