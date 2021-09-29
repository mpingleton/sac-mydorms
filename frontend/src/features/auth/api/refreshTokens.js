import { axios } from '@/lib/axios';

export const refreshTokens = (refreshToken) => axios.post('/auth/refresh-tokens', { refreshToken });

export default refreshTokens;
