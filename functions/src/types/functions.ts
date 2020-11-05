export type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;
export type HTTSReturn<T> = Promise<{ data: T }>;
export type ExtractReturn<Fn> = Fn extends (...args: any[]) => infer R
  ? R extends Promise<{ data: infer T }>
    ? Promise<T>
    : any
  : any;

export type CreateGame = (data: { username: string }) => HTTSReturn<{ code: string } | string>;

export type JoinGame = (data: { code: string; username: string }) => HTTSReturn<boolean | string>;
