import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';

export const getRooms = () => axios.get('/room');

export const useRooms = ({ config } = {}) => (
  useQuery({
    ...config,
    queryKey: ['room'],
    queryFn: () => getRooms(),
  })
);
