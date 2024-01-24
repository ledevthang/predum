import { SortState } from 'types/event';
import { FilterActionTypes, FilterState } from 'types/filterState';
import { FilterActionTypeEnum } from '../../enums/actions';

export const initialFilterState: FilterState = {
  sort: SortState.UPCOMING,
};

export const filterReducer = (
  state = initialFilterState,
  action: FilterActionTypes,
) => {
  switch (action.type) {
    case FilterActionTypeEnum.CHANGE_FILTER: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case FilterActionTypeEnum.RESET_FILTER: {
      return initialFilterState;
    }
    default:
      return state;
  }
};
