interface Headers {
  [key: string]: number | string[] | string | undefined;
}

export interface HttpEvent {
  id: string;
  method?: string;
  baseUrl?: string;
  collectionId: string;
  type: 'REQUEST' | 'RESPONSE';
  headers: Headers;
  body?: unknown;
}
