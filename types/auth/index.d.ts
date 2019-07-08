import Vue from 'vue';
export interface Authority {
    pid: string;
    [name: string]: any;
}
export interface Role {
    code: string;
    [key: string]: any;
}
export interface Principle {
    roles: Role[];
    authorities: Authority[];
    username: string;
    [key: string]: any;
}
export interface AuthOptions<T> {
    [key: string]: any;
}
export default class Auth<U extends Principle> {
    static install<T extends Principle>(_Vue: typeof Vue, options: AuthOptions<T>): void;
    constructor(options: any);
    config: any;
    vm: any;
    _lastPrinciple: Principle | null;
    private handlingInvalidate;
    principle: U | null;
    token: string;
    readonly authenticated: boolean;
    readonly username: string | null;
    invalidate(): void;
    access(pid: string): Promise<any>;
    hasRole(...roles: string[]): boolean;
    private clear;
    login(req: any): any;
    logout(): any;
    loadPrinciple(): Promise<Principle>;
}
