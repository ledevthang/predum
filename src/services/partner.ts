import axios from 'axios';
import { PartnerResponse } from 'types/partner';

const GetAllPartners = async (): Promise<PartnerResponse[]> => {
  const env =
    process.env.REACT_APP_NODE_ENV === 'production' ? 'production' : 'staging';
  const url = `https://efun-public.s3.ap-southeast-1.amazonaws.com/partners/${env}.json`;
  const data = await axios.get(url);
  return data.data;
};

export default {
  GetAllPartners,
};
