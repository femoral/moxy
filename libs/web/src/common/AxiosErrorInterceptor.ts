import { AxiosInstance } from 'axios';

export class AxiosErrorInterceptor {
  private _onError: Function | undefined;

  constructor(axiosInstance: AxiosInstance) {
    axiosInstance.interceptors.response.use(undefined, (error) => this.handler(error));
  }

  private handler(error: any) {
    this._onError?.call(undefined, error);
    return Promise.reject(error);
  }

  public subscribe(onError: Function) {
    this._onError = onError;
  }

  public unsubscribe() {
    delete this._onError;
  }
}
