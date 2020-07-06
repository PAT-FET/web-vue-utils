import { Principle } from './index';
export default function config(): {
    token: {
        enabled: boolean;
        key: string;
        storage: {
            get: () => any;
            set: (token: string) => void;
        };
    };
    excludeRedirectPages: string[];
    loginPage: string;
    successPage: string;
    cascade: {
        enabled: boolean;
        pid: string;
        children: string;
    };
    urls: {
        login: string;
        logout: string;
        loadPrinciple: string;
    };
    login: (req: any) => Promise<{
        token: string;
    }>;
    logout: () => Promise<any>;
    loadPrinciple: <T extends Principle>() => Promise<T>;
};
