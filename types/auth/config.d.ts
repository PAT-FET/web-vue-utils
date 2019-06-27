export default function config(): {
    userId: string;
    token: {
        enabled: boolean;
        key: string;
        storage: {
            get: () => any;
            set: (token: string) => void;
        };
    };
    urls: {
        login: string;
        logout: string;
        loadAuth: string;
        loadAuthorities: string;
    };
    login: (req: any) => Promise<{
        token: string;
    }>;
    logout: () => Promise<any>;
    loadAuth: () => Promise<any>;
    loadAuthorities: () => Promise<any>;
};
