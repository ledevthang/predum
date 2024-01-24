import { PaginationData, PaginationRequest } from 'enums/pagination';
import { apiRoutesEnum } from 'enums/routes';
import { GetAllEventRequest, GetOtherEventRequest, IEvent } from 'types/event';
import AXIOS from './axios';

const GetAllEvents = async (
  params: GetAllEventRequest,
): Promise<PaginationData<IEvent>> => {
  return AXIOS.get(apiRoutesEnum.EVENTS, { params });
};

const GetEventDetail = async (
  id: string,
  loginUserId?: string | null,
): Promise<IEvent> => {
  const data = await AXIOS.get(apiRoutesEnum.EVENTS, {
    params: {
      eventId: id,
      ...(loginUserId && {
        loginUserId,
      }),
    },
  });
  return data.data[0];
};

const UpdateEventView = async (id: string): Promise<IEvent> => {
  return AXIOS.put(`${apiRoutesEnum.EVENTS}/view/${id}`);
};
const UpdateEventStreamUrl = async (
  id: number,
  streamUrl: string,
): Promise<IEvent> => {
  return AXIOS.put(`${apiRoutesEnum.EVENTS}/streamUrl/${id}`, { streamUrl });
};
const UpdateEventScore = async (id: number, body: any): Promise<IEvent> => {
  return AXIOS.put(`${apiRoutesEnum.EVENTS}/scores/${id}`, { ...body });
};
const GetOtherEvents = async (
  params: GetOtherEventRequest & PaginationRequest,
): Promise<PaginationData<IEvent>> => {
  return AXIOS.get(`${apiRoutesEnum.EVENTS}/others`, { params });
};
const GetOtherEventsCategory = async (
  params: GetOtherEventRequest & PaginationRequest,
): Promise<PaginationData<IEvent>> => {
  return AXIOS.get(`${apiRoutesEnum.EVENTS}/others-category`, { params });
};

export const CreateNewEvent = async (body: any): Promise<IEvent> => {
  const { data } = await AXIOS.post(`${apiRoutesEnum.EVENTS}`, {
    ...body,
  });
  return data;
};

export const UpdateProofEvent = async (
  id: number,
  proof: string,
  type: string,
) => {
  return AXIOS.put(`${apiRoutesEnum.EVENTS}/update-result-proof/${id}`, {
    resultProofUrl: proof,
    typeUpload: type,
  });
};

export const BlockEvent = async (id: number): Promise<void> => {
  return AXIOS.put(`${apiRoutesEnum.ADMIN}/block-event/${id}`);
};

export const UnLockEvent = async (id: number): Promise<void> => {
  return AXIOS.put(`${apiRoutesEnum.ADMIN}/unblock-event/${id}`);
};

export default {
  GetAllEvents,
  GetEventDetail,
  GetOtherEvents,
  GetOtherEventsCategory,
  CreateNewEvent,
  UpdateEventView,
  UpdateProofEvent,
  UpdateEventStreamUrl,
  UpdateEventScore,
  BlockEvent,
  UnLockEvent,
};
