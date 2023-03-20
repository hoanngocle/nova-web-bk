import { LoginParams, RegisterParams } from 'src/types';
import { getAxiosClient, getAxiosClientWithToken } from '.';

const login = (params: LoginParams) => {
    const restClient = getAxiosClientWithToken();

    return restClient.post('/login', params);
};

const register = (params: RegisterParams) => {
    const restClient = getAxiosClient();

    return restClient.post('/register', params);
};

const AuthService = {
    register,
    login
};
export default AuthService;
