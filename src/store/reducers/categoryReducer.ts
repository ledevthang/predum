import { CategoryActionTypeEnum } from 'enums/actions';
import { ICategory } from 'types/category';

import { PaginationData } from './../../enums/pagination';
import { CategoryActionTypes } from './../../types/category';

interface CategoryState extends PaginationData<ICategory> {
  activedCategory?: string;
  activedType?: string;
}
export const initialCategoryState: CategoryState = {
  data: [],
  pageNumber: 0,
  pageSize: 0,
  total: 0,
  activedCategory: '',
  activedType: '',
};

export const categoryReducer = (
  state = initialCategoryState,
  action: CategoryActionTypes,
) => {
  switch (action.type) {
    case CategoryActionTypeEnum.GET_ALL_CATEGORIES: {
      return {
        ...state,
        ...action.payload,
        data: [
          ...(action.payload.pageNumber === 1 ? [] : state.data),
          ...action.payload.data,
        ],
      };
    }
    case CategoryActionTypeEnum.UPDATE_ACTIVED_CATEGORY: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
