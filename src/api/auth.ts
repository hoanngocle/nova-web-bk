import { getAxiosClient } from '.';

const login = (email: string, password: string, rememberMe?: boolean) => {
    const restClient = getAxiosClient();
    console.log(restClient.post('/login', { email, password, rememberMe }));

    return restClient.post('/login', { email, password, rememberMe });
};

const register = (email: string, password: string) => {
    const restClient = getAxiosClient();

    return restClient.post('/register', { email, password });
};

const AuthService = {
    register,
    login
};
export default AuthService;
