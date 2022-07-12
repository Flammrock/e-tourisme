export type RequestType = 'get' | 'post' | 'put' | 'delete';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ResolverFunction = (input: any) => Promise<any>;


export type ResolverEntity = {
  [key in RequestType]?: ResolverFunction;
};

export interface ResolverMap {
  [key: string]: ResolverEntity;
}

