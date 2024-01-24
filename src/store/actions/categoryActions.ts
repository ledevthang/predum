import { PaginationData } from 'enums/pagination';
import categoryService from 'services/category';
import { ApiError } from 'types/api';
import { ICategory } from 'types/category';
import { DispatchType } from 'types/store';

import { CategoryActionTypeEnum } from './../../enums/actions';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getCategoriesSuccessAction = (
  payload: PaginationData<ICategory>,
) => ({
  type: CategoryActionTypeEnum.GET_ALL_CATEGORIES,
  payload,
});

export const updateActivedCategorySuccessAction = (payload: {
  activedCategory?: string;
  activedType?: string;
}) => ({
  type: CategoryActionTypeEnum.UPDATE_ACTIVED_CATEGORY,
  payload,
});

export const getAllCategoryAction = (userId?: number) => {
  const taskId = CategoryActionTypeEnum.GET_ALL_CATEGORIES;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = userId
        ? await categoryService.GetAllCategories({
            pageNumber: 1,
            pageSize: 9999,
            userId: userId,
          })
        : await categoryService.GetAllCategories({
            pageNumber: 1,
            pageSize: 9999,
          });
      dispatch(getCategoriesSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
export const updateActivedCategoryAction = (
  activedCategory: string,
  activedType: string,
) => {
  const taskId = CategoryActionTypeEnum.GET_ALL_CATEGORIES;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      dispatch(
        updateActivedCategorySuccessAction({
          activedCategory,
          activedType,
        }),
      );
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
