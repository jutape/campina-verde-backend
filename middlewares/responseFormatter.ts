import express from 'express';
import { removeEmptyFields } from '../utils/responseFormatter.js';

/**
 * Middleware para remover campos vazios de todas as respostas
 */
export const responseFormatter = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  // Salva a referência original do método json
  const originalJson = res.json;
  const originalSend = res.send;

  // Sobrescreve o método json para filtrar campos vazios
  res.json = function(body: any): express.Response {
    return originalJson.call(this, removeEmptyFields(body));
  };

  // Sobrescreve o método send para caso seja enviado um objeto JSON
  res.send = function(body: any): express.Response {
    if (body && typeof body === 'object') {
      return originalSend.call(this, removeEmptyFields(body));
    }
    return originalSend.call(this, body);
  };

  next();
};
