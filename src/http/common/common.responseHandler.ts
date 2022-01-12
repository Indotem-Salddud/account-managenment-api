import express from 'express';

/**
 * ! Send response from BEND to the FEND with the data provided
 * * whitehatdevv - 2021/01/12
 * @param statusCode {number}
 * @param body {T} Object-ErrorHandler
 * @param res {express.Response}
 */
export function s<T>(statusCode: number, body: T, res: express.Response): void {
  res.send(body).status(statusCode);
}
