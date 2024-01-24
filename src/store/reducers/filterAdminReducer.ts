import dayjs from 'dayjs';
import { FilterActionAdminTypes, FilterAdminState } from 'types/filterState';
import { FilterActionAdminTypeEnum } from '../../enums/actions';
import { getMonday } from './../../helpers/index';

export const initialFilterAdminState: FilterAdminState = {
  token: '',
  from: dayjs(getMonday()).startOf('day').toDate(),
  to: dayjs(new Date()).endOf('day').toDate(),
};

export const filterAdminReducer = (
  state = initialFilterAdminState,
  action: FilterActionAdminTypes,
) => {
  switch (action.type) {
    case FilterActionAdminTypeEnum.CHANGE_FILTER_ADMIN: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case FilterActionAdminTypeEnum.RESET_FILTER_ADMIN: {
      return initialFilterAdminState;
    }
    default:
      return state;
  }
};
