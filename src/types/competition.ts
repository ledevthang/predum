import { CompetitionTypeEnum } from 'enums/actions';
import { PaginationData, PaginationRequest } from './../enums/pagination';

export interface ICompetition {
  id: number;
  name: string;
  categoryId?: number;
  userId?: number;
}

export interface CompetitionRequest extends PaginationRequest {
  categoryId?: number;
}

export interface AddCompetitionBody {
  name: string;
  categoryId: number;
}

export interface GetAllCompetitionAction {
  type: CompetitionTypeEnum.GET_ALL_COMPETITIONS;
  payload: PaginationData<ICompetition>;
}

export type CompetitionActionTypes = GetAllCompetitionAction;
