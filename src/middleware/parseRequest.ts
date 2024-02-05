import { Request, Response, NextFunction } from "express";

export function parseRequestBody(req: Request, res: Response, next: NextFunction) {
    if (req.headers['content-type'] === 'application/json') {
        try {
            req.body = JSON.parse(req.body);
        } catch (error) {
            return res.status(400).send('Invalid JSON format');
        }
    }
    next();
}
