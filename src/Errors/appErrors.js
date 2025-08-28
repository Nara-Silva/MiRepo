class AppError extends Error {
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;
  
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
class NotFoundError extends AppError {
    constructor(message = 'Recurso no encontrado') { // mensaje por defecto por si no me lo pasan
      super(message, 404);
    }
  }
  
class ValidationError extends AppError {
    constructor(message = 'Datos de validación inválidos') {
      super(message, 400);
    }
  }
  
class ConflictError extends AppError {
    constructor(message = 'Conflicto con el recurso existente') {
      super(message, 409);
    }
  } 

module.exports = {ConflictError, ValidationError, NotFoundError};