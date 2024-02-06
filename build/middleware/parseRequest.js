"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseRequestBody = void 0;
function parseRequestBody(req, res, next) {
    if (req.headers['content-type'] === 'application/json') {
        try {
            req.body = JSON.parse(req.body);
        }
        catch (error) {
            return res.status(400).send('Invalid JSON format');
        }
    }
    next();
}
exports.parseRequestBody = parseRequestBody;
