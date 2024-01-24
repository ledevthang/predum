import { SortState } from 'types/event';
import {
  FilterActionAdminTypeEnum,
  FilterActionTypeEnum,
} from '../enums/actions';

export interface FilterState {
  search?: string;
  sort?: SortState;
  categoryId?: number;
  userId?: number;
  competitionId?: number;
  outOfTime?: boolean;
  isHotInfo?: boolean;
  subCategoryId?: number;
  isHot?: boolean;
  tokenIds?: string[];
  eventTypes?: string[];
  listingStatuses?: string[];
}

export interface FilterAdminState {
  from: Date | null;
  to: Date | null;
  token: string;
}
export interface UpdateFilterAction {
  type: typeof FilterActionTypeEnum.CHANGE_FILTER;
  payload: FilterState;
}
export interface ResetFilterAction {
  type: typeof FilterActionTypeEnum.RESET_FILTER;
}

export interface UpdateFilterAdminAction {
  type: typeof FilterActionAdminTypeEnum.CHANGE_FILTER_ADMIN;
  payload: FilterAdminState;
}
export interface ResetFilterAdminAction {
  type: typeof FilterActionAdminTypeEnum.RESET_FILTER_ADMIN;
}

export type FilterActionTypes = UpdateFilterAction | ResetFilterAction;
export type FilterActionAdminTypes =
  | UpdateFilterAdminAction
  | ResetFilterAdminAction;
