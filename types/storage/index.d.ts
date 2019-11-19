import { Vue } from 'vue-property-decorator';
export interface StorageVendor {
    get(key: string, namespace: string): Promise<any>;
    set(key: string, value: any, namespace: string): Promise<any>;
}
export declare class LocalStorage implements StorageVendor {
    get(key: string, namespace: string): Promise<any>;
    set(key: string, value: any, namespace: string): Promise<any>;
    private resolveKey;
}
export interface StorageOption {
    vendor?: StorageVendor;
}
export default class Storage extends Vue {
    static install(_Vue: typeof Vue, options: StorageOption): void;
    vendor: StorageVendor;
    namespace: string;
    private state;
    set(key: string, value: any, namespace?: string): Promise<any>;
    get(key: string, namespace?: string): any;
    load(key: string, namespace?: string): Promise<any>;
}
