import { CategoryActionTypeEnum } from 'enums/actions';

import { PaginationData, PaginationRequest } from './../enums/pagination';

export interface ICategory {
  id: number;
  name: string;
  index: number;
  fatherId?: number | null;
  userId?: number;
}
export interface CategoryRequest extends PaginationRequest {
  userId?: number;
}
export interface GetAllCategoryAction {
  type: CategoryActionTypeEnum.GET_ALL_CATEGORIES;
  payload: PaginationData<ICategory>;
}
export interface UpdateActivedCategoryAction {
  type: CategoryActionTypeEnum.UPDATE_ACTIVED_CATEGORY;
  payload: {
    activedCategory: string;
    activedType: string;
  };
}

export type CategoryActionTypes =
  | GetAllCategoryAction
  | UpdateActivedCategoryAction;
