import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';

export const getResidents = () => axios.get('/personnel');

export const useResidents = ({ config } = {}) => (
  useQuery({
    ...config,
    queryKey: ['personnel'],
    queryFn: () => getResidents(),
  })
);
