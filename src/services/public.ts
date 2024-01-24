import { IBanner } from 'types/public';
import axios from 'axios';

async function GetAllBanners(): Promise<IBanner[]> {
  const data = await axios.get(
    `https://efun-public.s3.ap-southeast-1.amazonaws.com/top-banner/predum-banner.json`,
  );
  return data.data;
}

async function GetAllRightBanners(): Promise<IBanner[]> {
  const env =
    process.env.REACT_APP_NODE_ENV == 'production' ? 'production' : 'staging';
  const data = await axios.get(
    `https://efun-public.s3.ap-southeast-1.amazonaws.com/right-banner/predum-right-banner.json`,
  );
  return data.data;
}

export default {
  GetAllBanners,
  GetAllRightBanners,
};
