import { PaginationData } from 'enums/pagination';
// eslint-disable-next-line prettier/prettier
import {
  CreateCommentBody,
  GetAllCommentRequest,
  IComment,
} from 'types/comment';

import { apiRoutesEnum } from './../enums/routes';
import AXIOS from './axios';

const CreateNewComment = async (body: CreateCommentBody) => {
  return AXIOS.post(apiRoutesEnum.COMMENTS, { ...body });
};

const GetAllReport = async (
  params: GetAllCommentRequest,
): Promise<PaginationData<IComment>> => {
  return AXIOS.get(`${apiRoutesEnum.COMMENTS}`, { params });
};

export default {
  CreateNewComment,
  GetAllReport,
};
