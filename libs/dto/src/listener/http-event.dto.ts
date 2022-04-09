interface Headers {
  [key: string]: string[] | string | undefined;
}

export interface HttpEvent {
  method?: string;
  baseUrl?: string;
  collectionId: string;
  type: 'REQUEST' | 'RESPONSE';
  headers: Headers;
  body?: unknown;
}
