import { PathViewModel } from './PathViewModel';

export interface CollectionViewModel {
  id?: string;
  name: string;
  basePath: string;
  pathNumber: number;
  paths?: PathViewModel[];
  fallbackProxyEnabled: boolean;
  targetScheme?: string;
  targetHost?: string;
}

export interface FallbackProxy {}
