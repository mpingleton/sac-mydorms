import { useQuery } from 'react-query';
import { axios } from '@/lib/axios';

export const getUsers = () => axios.get('/users');

export const useUsers = ({ config } = {}) => (
  useQuery({
    ...config,
    queryKey: ['users'],
    queryFn: () => getUsers(),
  })
);
