import { validationResult, matchedData } from 'express-validator';
import { HttpRequest, HttpResponse } from './http';
async function validateFormData(req: HttpRequest, res: HttpResponse, next) {
    const validation = validationResult(req); // get validation errors if any
    if (!validation.isEmpty()) {
        let errorMsgs = [];
        validation.array().forEach(error => {
            let fieldName = error.param;
            let message = error.msg.toString();
            errorMsgs.push(`${fieldName}: ${message}`);
        });
        return res.badRequest(errorMsgs);
    }

    req.getValidFormData = function (options?: {}) {
        return matchedData(req, { locations: ['body'], ...options });
    }

    return next();
}
export default validateFormData;