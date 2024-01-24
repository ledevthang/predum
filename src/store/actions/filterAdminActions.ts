import { FilterActionAdminTypeEnum } from 'enums/actions';
import { FilterAdminState } from '../../types/filterState';

export const updateFilterAdminAction = (
  payload: Partial<FilterAdminState>,
) => ({
  type: FilterActionAdminTypeEnum.CHANGE_FILTER_ADMIN,
  payload,
});
export const resetFilterAdminAction = () => ({
  type: FilterActionAdminTypeEnum.RESET_FILTER_ADMIN,
});
