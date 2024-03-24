import { Request, Response } from "express";

const handleError = (err: Error, req: Request, res: Response) => {
  console.error(err.stack);
  const statusCode: number = (err as any).statusCode || 500;
  const errorMessage: string = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    error: errorMessage,
  });
};

export default handleError;
