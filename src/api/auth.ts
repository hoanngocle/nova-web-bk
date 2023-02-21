import { getAxiosClient } from '.';

export const authenticate = (email: string, password: string) => {
    const restClient = getAxiosClient();

    return restClient.post('/login', { email, password });
};

class AuthService {
    login(email: string, password: string) {
        const restClient = getAxiosClient();

        return restClient.post('/login', { email, password });
    }

    register(email: string, password: string) {
        const restClient = getAxiosClient();

        return restClient.post('/register', { email, password });
    }
}

export default AuthService;
