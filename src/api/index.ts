import axios, { AxiosError } from 'axios';
import { isDevMode } from 'src/@core/utils/helper';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * Call axios.create without token on the header
 **/
export const getAxiosClient = () => {
    return axios.create({
        baseURL: BASE_URL
    });
};

/**
 * Call axios.create with token on the header
 */
export const getAxiosClientWithToken = () => {
    const client = getAxiosClient();

    // client.defaults.headers.common['Authorization'] = 'Bearer ' + store.getState().auth.token;
    client.defaults.headers.common['Content-Type'] = 'application/json';
    client.defaults.headers.common['Accept'] = 'application/json';

    return client;
};

/**
 * Show error message
 */

export const getErrorMessage = (error: AxiosError) => {
    const { status, data } = error.response || {};

    if (status && status === 422) {
        return data ?? error?.message;
    }
    if (status && status < 500) {
        return error?.message;
    }

    if (isDevMode()) console.error(error);

    return 'Server Error';
};
