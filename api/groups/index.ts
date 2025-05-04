import { TelegramGroup } from '@/stores/slice/groupSlice';
import HTTP from '../http';

const fetchGroups = async (userId: number): Promise<TelegramGroup[]> => {
  const response = await HTTP.get(`/groups/${userId}`);
  return response.data;
}

export {
  fetchGroups,
}
