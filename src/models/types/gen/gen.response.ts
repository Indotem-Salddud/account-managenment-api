/**
 * ! Response from back to front
 * * whitehatdevv - 2021/12/14
 */
export interface ResponseHandler {
  statusCode: number;
  message: string;
  data?: Object;
}
