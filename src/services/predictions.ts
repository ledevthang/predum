import { PaginationData } from 'enums/pagination';
import { GetAllPredictionRequest, IPrediction } from 'types/prediction';
import { apiRoutesEnum } from './../enums/routes';
import AXIOS from './axios';

function GetAllPrediction(
  params: GetAllPredictionRequest,
): Promise<PaginationData<IPrediction>> {
  return AXIOS.get(apiRoutesEnum.PREDICTIONS, {
    params,
  });
}
function GetAllPredictionEachEvent(
  params: GetAllPredictionRequest,
): Promise<PaginationData<IPrediction>> {
  return AXIOS.get(`${apiRoutesEnum.PREDICTIONS}`, {
    params,
  });
}

function GetPredictionDetail(id: number): Promise<IPrediction> {
  return AXIOS.get(`${apiRoutesEnum.PREDICTIONS}/${id}`);
}
export const UpdatePreviewPredictUrl = async (id: number, proof: string) => {
  return AXIOS.put(
    `${apiRoutesEnum.PREDICTIONS}/update-preview-predict/${id}`,
    {
      previewPredictUrl: proof,
    },
  );
};
function GetPredictionPreviewDetail(
  id: number,
): Promise<PaginationData<IPrediction>> {
  return AXIOS.get(
    `${apiRoutesEnum.PREDICTIONS}/all?predictionId=${id}&pageNumber=1&pageSize=20`,
  );
}
export default {
  GetAllPrediction,
  GetPredictionDetail,
  GetAllPredictionEachEvent,
  UpdatePreviewPredictUrl,
  GetPredictionPreviewDetail,
};
