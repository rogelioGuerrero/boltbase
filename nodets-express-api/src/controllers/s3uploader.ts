/**
 * Upload controller module
 * @category  Controller / Route
*/
import { Router } from 'express';
import { HttpRequest, HttpResponse } from '../helpers/http';
import { s3UploadMiddleware } from '../helpers/upload_middleware';

const router = Router();
router.post('/upload/:fieldname', s3UploadMiddleware(), async (req: HttpRequest, res: HttpResponse, next) => {
	if (req.files) {
		const uploadedFiles = req.files as any[];
		let uploadedPaths = uploadedFiles.map(file => file.location).toString();
		return res.ok(uploadedPaths);
	}
	else {
		return res.badRequest('No file uploaded.')
	}
});

/**
 * remove temporary uploaded file when deleted by client
 * @category  Controller / Route
*/
router.post('/remove_temp_file', function (req: HttpRequest, res: HttpResponse) {
	// not implemented
	return res.badRequest("Operation not implemented")
});

export default router;