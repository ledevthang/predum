import { PaginationData } from 'enums/pagination';
import fixtureService from 'services/fixture';
import { ApiError } from 'types/api';
import { GetAllFixtureRequest, IFixture } from 'types/fixture';
import { DispatchType } from 'types/store';
import { FixtureActionTypeEnum } from './../../enums/actions';
import { asyncTaskStartAction, asyncTaskStopAction } from './asyncTaskActions';

export const getFixtureSuccessAction = (payload: PaginationData<IFixture>) => ({
  type: FixtureActionTypeEnum.GET_ALL_FIXTURES,
  payload,
});

export const getFixtureInfiniteSuccessAction = (
  payload: PaginationData<IFixture>,
) => ({
  type: FixtureActionTypeEnum.GET_ALL_FIXTURES_INFINITE,
  payload,
});

export const getAllFixturesAction = (request: GetAllFixtureRequest) => {
  const taskId = FixtureActionTypeEnum.GET_ALL_FIXTURES;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await fixtureService.GetAllFixtures(request);
      dispatch(getFixtureSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};

export const getAllFixturesInfiniteAction = (request: GetAllFixtureRequest) => {
  const taskId = FixtureActionTypeEnum.GET_ALL_FIXTURES_INFINITE;
  return async (dispatch: DispatchType): Promise<void> => {
    try {
      dispatch(asyncTaskStartAction(taskId));
      const data = await fixtureService.GetAllFixtures(request);
      dispatch(getFixtureInfiniteSuccessAction(data));
      dispatch(asyncTaskStopAction(taskId));
    } catch (error) {
      dispatch(asyncTaskStopAction(taskId, error as ApiError));
    }
  };
};
