import axios, {
  Axios,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import queryString from "query-string";

// DEBUG
const isDebug = process.env.NODE_ENV !== "production";

class Http<T = any> extends Axios {
  private _http: AxiosInstance;

  public constructor(configs?: AxiosRequestConfig<T>) {
    super(configs);
    this._http = axios.create(configs);
    this.interceptorsRequest();
    this.interceptorsResponse();
  }

  /**
   *
   * @param url string
   * @param config AxiosRequestConfig
   */
  public get<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<R> {
    return this._http.get<T, R>(url, config);
  }

  /**
   *
   * @param url
   * @param data
   * @param config
   */
  public post<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ): Promise<R> {
    return this._http.post<T, R>(url, data, config);
  }

  /**
   *
   * @param url
   * @param data
   * @param config
   */
  public put<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ): Promise<R> {
    return this._http.put<T, R>(url, data, config);
  }

  /**
   *
   * @param url
   * @param data
   * @param config
   */
  public patch<T = any, R = AxiosResponse<T>>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig | undefined
  ): Promise<R> {
    return this._http.patch<T, R>(url, data, config);
  }

  /**
   *
   * @param url
   * @param data
   * @param config
   */
  public delete<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<R> {
    return this._http.delete<T, R>(url, config);
  }

  /**
   *
   * @param url
   * @param data
   * @param config
   */
  public head<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<R> {
    return this._http.head<T, R>(url, config);
  }

  /**
   *
   * @param url
   * @param data
   * @param config
   */
  public options<T = any, R = AxiosResponse<T>>(
    url: string,
    config?: AxiosRequestConfig | undefined
  ): Promise<R> {
    return this._http.options<T, R>(url, config);
  }

  /**
   *
   */
  private interceptorsRequest(): void {
    this._http.interceptors.request.use(
      async (config: AxiosRequestConfig) => {
        // Do something before request is sent
        try {
          if (isDebug) {
            // can output log here
          }
          const token = localStorage.getItem("token");
          config.headers = {
            // Authorization: 'Basic dGVzdDI6MTIzNA==',
            ...config.headers,
            ...{
              Authorization: `Basic ${token}`
            }
          };
        } catch (error) {
          console.error(error);
          return Promise.reject(error);
        }
        return config;
      },
      (error) => {
        // Do something with request error
        return Promise.reject(error);
      }
    );
  }

  /**
   *
   */
  private interceptorsResponse(): void {
    this._http.interceptors.response.use(
      (response: any) => {
        // Do something with response data
        try {
          if (isDebug) {
            // can output log here
          }
        } catch (error) {
          console.error(error);
          return Promise.reject(error);
        }
        return response;
      },
      (error: any) => {
        if (isDebug) {
          // can output log here
        }
        // Do something with response error
        if (error.response.status === 401) {
          // if(!error.request.responseURL.toLowerCase().includes('api/authenticate'))
          // location.pathname='/admin/login'
        }
        return Promise.reject(error);
      }
    );
  }
}

export default new Http({
  baseURL: "http://localhost:8000/api/auth/",
  withCredentials: true,
  // You may want to set this so axios automatically parse your data to a object.
  transformResponse: (res) => {
    return JSON.parse(res);
  },
  transformRequest: (req) => {
    return JSON.stringify(req);
  },
  headers: {
    "Access-Control-Allow-Origin": "true",
    "Content-Type": "application/json"
  }
});
