import { CommentTypeEnum } from 'enums/actions';
import { PaginationData, PaginationRequest } from 'enums/pagination';

export interface IComment {
  id: number;
  content: string;
  userId: number;
  eventId: number;
  createdAt: string;
  user: {
    id: number;
    nickname?: string;
    avatarUrl?: string;
    address: string;
  };
}
export interface CreateCommentBody {
  userId: number;
  content: string;
  eventId: number;
}
export interface GetAllCommentRequest extends PaginationRequest {
  eventId: number;
}

export interface GetAllCommentEventAction {
  type: CommentTypeEnum.GET_ALL_COMMENT_EVENT;
  payload: PaginationData<IComment>;
}

export type CommentActionTypes = GetAllCommentEventAction;
