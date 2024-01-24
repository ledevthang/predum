import { PaginationData } from 'enums/pagination';
import {
  CreatePostBody,
  CreatePostCommentBody,
  GetAllPostCommentRequest,
  GetAllPostRequest,
  IPost,
  IPostComment,
} from 'types/community';

import { apiRoutesEnum } from './../enums/routes';
import AXIOS from './axios';

const CreateNewPost = async (body: CreatePostBody) => {
  return AXIOS.post(apiRoutesEnum.POSTS, { ...body });
};

const CreateNewPostComment = async (body: CreatePostCommentBody) => {
  return AXIOS.post(apiRoutesEnum.POST_COMMENTS, { ...body });
};
const GetPostDetail = async (id: number) => {
  return AXIOS.get(`${apiRoutesEnum.POSTS}/${id}`);
};
const GetAllPosts = async (
  params: GetAllPostRequest,
): Promise<PaginationData<IPost>> => {
  return AXIOS.get(`${apiRoutesEnum.POSTS}`, { params });
};
const GetAllPostComment = async (
  params: GetAllPostCommentRequest,
): Promise<PaginationData<IPostComment>> => {
  return AXIOS.get(`${apiRoutesEnum.POST_COMMENTS}`, { params });
};

export default {
  CreateNewPost,
  GetAllPosts,
  CreateNewPostComment,
  GetPostDetail,
  GetAllPostComment,
};
