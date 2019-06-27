import { AxiosResponse } from 'axios';
export default function (config: any): (response: AxiosResponse<any>) => Promise<any>;
