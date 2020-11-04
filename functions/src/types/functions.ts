export type FirstArgument<T> = T extends (arg1: infer U, ...args: any[]) => any ? U : any;

export type UpdateUsername = (data: { name: string }) => void;
