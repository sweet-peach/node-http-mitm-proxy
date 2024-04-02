/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import http = require("http");
import https = require("https");
import type CA from "../lib/ca";
import type WebSocket from "ws";
import type { Server } from "https";
import type { WebSocket as WebSocketType, WebSocketServer } from "ws";
export interface IProxyStatic {
    (): IProxy;
    gunzip: any;
    wildcard: any;
}
export interface IProxyOptions {
    port?: number;
    host?: string;
    sslCaDir?: string;
    keepAlive?: boolean;
    timeout?: number;
    httpAgent?: http.Agent;
    httpsAgent?: https.Agent;
    forceSNI?: boolean;
    httpsPort?: number;
    forceChunkedRequest?: boolean;
}
export interface IProxySSLServer {
    port: number;
    server?: Server;
    wsServer?: WebSocketServer;
}
export type ICreateServerCallback = (port: number, server: Server, wssServer: WebSocketServer) => void;
export type ErrorCallback = (error?: Error | null, data?: any) => void;
export type OnRequestParams = (ctx: IContext, callback: ErrorCallback) => void;
export type OnWebsocketRequestParams = (ctx: IWebSocketContext, callback: ErrorCallback) => void;
export type IWebSocketCallback = (err: MaybeError, message?: any, flags?: any) => void;
export type OnWebSocketSendParams = (ctx: IWebSocketContext, message: any, flags: any, callback: IWebSocketCallback) => void;
export type OnWebSocketMessageParams = (ctx: IWebSocketContext, message: any, flags: any, callback: IWebSocketCallback) => void;
export type OnWebSocketFrameParams = (ctx: IWebSocketContext, type: any, fromServer: boolean, message: any, flags: any, callback: IWebSocketCallback) => void;
export type OnWebSocketErrorParams = (ctx: IWebSocketContext, err: MaybeError) => void;
export type OnWebSocketCloseParams = (ctx: IWebSocketContext, code: any, message: any, callback: IWebSocketCallback) => void;
export interface ICertDetails {
    keyFile: string;
    certFile: string;
    hosts?: string[];
}
export type MaybeError = Error | null | undefined;
export type OnCertificateMissingCallback = (error: MaybeError, certDetails: ICertDetails) => void;
export type OnCertificateRequiredCallback = (error: MaybeError, certDetails: ICertDetails) => void;
export type OnRequestDataCallback = (error?: MaybeError, chunk?: Buffer) => void;
export type OnRequestDataParams = (ctx: IContext, chunk: Buffer, callback: OnRequestDataCallback) => void;
export type OnErrorParams = (context: IContext | null, err?: MaybeError, errorKind?: string) => void;
export type OnConnectParams = (req: http.IncomingMessage, socket: import("stream").Duplex, head: any, callback: ErrorCallback) => void;
export type IProxy = ICallbacks & {
    listen(options?: IProxyOptions, callback?: () => void): void;
    close(): void;
    onCertificateRequired(hostname: string, callback: OnCertificateRequiredCallback): void;
    onCertificateMissing(ctx: ICertficateContext, files: any, callback: OnCertificateMissingCallback): void;
    onConnect(fcn: OnConnectParams): void;
    onWebSocketConnection(fcn: OnWebsocketRequestParams): void;
    onWebSocketSend(fcn: OnWebSocketSendParams): void;
    onWebSocketMessage(fcn: OnWebSocketMessageParams): void;
    onWebSocketFrame(fcn: OnWebSocketFrameParams): void;
    onWebSocketError(fcn: OnWebSocketErrorParams): void;
    onWebSocketClose(fcn: OnWebSocketCloseParams): void;
    options: IProxyOptions;
    httpPort: number;
    timeout: number;
    keepAlive: boolean;
    httpAgent: http.Agent;
    httpsAgent: https.Agent;
    forceSNI: boolean;
    httpsPort?: number;
    sslCaDir: string;
    ca: CA;
};
export interface ICallbacks {
    onError(callback: OnErrorParams): void;
    onRequest(fcn: OnRequestParams): void;
    onRequestHeaders(fcn: OnRequestParams): void;
    onResponseHeaders(fcn: OnRequestParams): void;
    onRequestData(fcn: OnRequestDataParams): void;
    onRequestEnd(fcn: OnRequestParams): void;
    onResponse(fcn: OnRequestParams): void;
    onResponseData(fcn: OnRequestDataParams): void;
    onResponseEnd(fcn: OnRequestParams): void;
    use(mod: any): void;
}
export interface IBaseContext {
    isSSL: boolean;
    uuid: string;
    closedByServer?: boolean;
    closedByClient?: boolean;
    connectRequest: http.IncomingMessage;
    tags?: {
        id: number;
        uri: string;
        failedUpstreamCalls: number;
        retryProxyRequest: boolean;
        [key: string]: any;
    };
    use(mod: any): void;
}
export type IContext = ICallbacks & IBaseContext & {
    clientToProxyRequest: http.IncomingMessage;
    proxyToClientResponse: http.ServerResponse;
    proxyToServerRequest: http.ClientRequest | undefined;
    serverToProxyResponse: http.IncomingMessage | undefined;
    addRequestFilter(stream: any): void;
    addResponseFilter(stream: any): void;
    requestFilters: any[];
    responseFilters: any[];
    proxyToServerRequestOptions: undefined | {
        method: string;
        path: string;
        host: string;
        port: string | number | null | undefined;
        headers: {
            [key: string]: string;
        };
        agent: http.Agent;
    };
    onRequestHandlers: OnRequestParams[];
    onResponseHandlers: OnRequestParams[];
    onErrorHandlers: OnErrorParams[];
    onRequestDataHandlers: OnRequestDataParams[];
    onResponseDataHandlers: OnRequestDataParams[];
    onRequestEndHandlers: OnRequestParams[];
    onResponseEndHandlers: OnRequestParams[];
    onRequestHeadersHandlers: OnRequestParams[];
    onResponseHeadersHandlers: OnRequestParams[];
    responseContentPotentiallyModified: boolean;
};
export interface ICertficateContext {
    hostname: string;
    files: ICertDetails;
    data: {
        keyFileExists: boolean;
        certFileExists: boolean;
    };
}
export type IWebSocketContext = IBaseContext & {
    clientToProxyWebSocket?: WebSocketType;
    proxyToServerWebSocket?: WebSocketType;
    proxyToServerWebSocketOptions?: WebSocket.ClientOptions & {
        url?: string;
    };
    onWebSocketConnectionHandlers: OnWebsocketRequestParams[];
    onWebSocketFrameHandlers: OnWebSocketFrameParams[];
    onWebSocketCloseHandlers: OnWebSocketCloseParams[];
    onWebSocketErrorHandlers: OnWebSocketErrorParams[];
    onWebSocketConnection: (ws: OnWebsocketRequestParams) => void;
    onWebSocketSend: (ws: OnWebSocketSendParams) => void;
    onWebSocketMessage: (ws: OnWebSocketMessageParams) => void;
    onWebSocketFrame: (ws: OnWebSocketFrameParams) => void;
    onWebSocketClose: (ws: OnWebSocketCloseParams) => void;
    onWebSocketError: (ws: OnWebSocketErrorParams) => void;
};
