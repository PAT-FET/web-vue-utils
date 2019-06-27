import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
export default function (config: any): {
    req: (config: AxiosRequestConfig) => any;
    reqErr: (err: any) => any;
    res: (response: AxiosResponse<any>) => any;
    resErr: (err: AxiosError<any>) => any;
};
