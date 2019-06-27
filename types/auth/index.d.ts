import Vue from 'vue';
export interface Authority {
    pid: string;
    [name: string]: any;
}
export default class Auth<U> {
    static install(_Vue: typeof Vue, options: any): void;
    constructor(options: any);
    config: any;
    vm: any;
    private handlingInvalidate;
    auth: U | null;
    token: string;
    readonly username: string;
    authorities: Authority[];
    invalidate(): void;
    access(pid: string): Promise<any>;
    private clear;
    login(req: any): any;
    logout(): any;
}
