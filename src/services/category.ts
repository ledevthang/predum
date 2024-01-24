import { apiRoutesEnum } from './../enums/routes';
import { PaginationData } from './../enums/pagination';
import { CategoryRequest, ICategory } from './../types/category';
import AXIOS from './axios';

const GetAllCategories = async (
  params: CategoryRequest,
): Promise<PaginationData<ICategory>> => {
  return AXIOS.get(apiRoutesEnum.CATEGORIES, { params });
};

export default {
  GetAllCategories,
};
