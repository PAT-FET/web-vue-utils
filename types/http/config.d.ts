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
    expiredHandler: () => void;
};
