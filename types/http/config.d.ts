import { AxiosRequestConfig, AxiosResponse } from 'axios';
export default function config(): {
    baseURL: string;
    withCredentials: boolean;
    timeout: number;
    map: {
        code: string;
        msg: string;
        data: string;
        successCode: string;
        expiredCode: string;
    };
    request: (cfg: AxiosRequestConfig) => void;
    response: (response: AxiosResponse<any>) => void;
    timestamp: boolean;
    expiredHandler: (data: any) => void;
};
