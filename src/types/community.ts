import { PostTypeEnum } from 'enums/actions';
import { PaginationData, PaginationRequest } from 'enums/pagination';

export interface IPost {
  id: number;
  content: string;
  userId: number;
  coverUrl?: string;
  createdAt: string;
  userNickname?: string;
  userAvatarUrl?: string;
  userAddress: string;
  countCommentPost: number;
}
export interface IPostComment {
  id: number;
  content: string;
  userId: number;
  createdAt: string;
  postId: number;
  user: {
    id: number;
    address: string;
    nickname?: string;
    avatarUrl?: string;
  };
}
export interface CreatePostBody {
  content: string;
  coverUrl: number;
}
export interface CreatePostCommentBody {
  content: string;
  postId: number;
}
export interface GetAllPostRequest extends PaginationRequest {
  userId: number;
}
export interface GetAllPostCommentRequest extends PaginationRequest {
  postId: number;
}

export interface GetAllPostAction {
  type: PostTypeEnum.GET_ALL_POST;
  payload: PaginationData<IPost>;
}

export type PostActionTypes = GetAllPostAction;
