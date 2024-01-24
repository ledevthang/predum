import { FixtureActionTypeEnum } from 'enums/actions';
import { PaginationData } from 'enums/pagination';
import { FixtureActionTypes, IFixture } from 'types/fixture';

export const initialFixtureState: PaginationData<IFixture> = {
  pageNumber: 0,
  pageSize: 0,
  total: 0,
  data: [],
};

export const fixtureReducer = (
  state: PaginationData<IFixture> = initialFixtureState,
  action: FixtureActionTypes,
) => {
  switch (action.type) {
    case FixtureActionTypeEnum.GET_ALL_FIXTURES: {
      return {
        ...state,
        ...action.payload,
        data: [...action.payload.data],
      };
    }
    case FixtureActionTypeEnum.GET_ALL_FIXTURES_INFINITE: {
      return {
        ...state,
        ...action.payload,
        data: [
          ...(action.payload.pageNumber === 1 ? [] : state.data),
          ...action.payload.data,
        ],
      };
    }
    default:
      return state;
  }
};
