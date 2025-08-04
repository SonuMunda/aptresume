export interface IResponseData<T = unknown> {
  data?: T | null;
  success: boolean;
  message: string;
}
