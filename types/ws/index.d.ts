import { Vue } from 'vue-property-decorator';
export interface WsOption {
    url: string;
    reconnectTimes?: number;
    reconnectInterval?: number;
}
export default class Ws extends Vue {
    static install(_Vue: typeof Vue, options: WsOption): void;
    url: string;
    reconnectTimes: number;
    reconnectInterval: number;
    ws: WebSocket | null;
    private reconnecting;
    connect(): void;
    reconnect(): void;
}
