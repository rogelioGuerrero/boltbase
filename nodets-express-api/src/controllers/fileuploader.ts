/**
 * Upload controller module
 * @category  Controller / Route
*/
import { Router } from 'express';
import config from '../config';
import uploader from '../helpers/uploader';
import { HttpRequest, HttpResponse } from '../helpers/http';
import { fileUploadMiddleware } from '../helpers/upload_middleware';

const router = Router();

router.post('/upload/:fieldname', fileUploadMiddleware(), async (req: HttpRequest, res: HttpResponse, next) => {
	if (req?.files.length) {
		const uploadedFiles = req.files as any[];
		const publicDir = config.app.publicDir;
		let uploadedPaths = uploadedFiles.map(file => {
			let filePath = file.path.replaceAll("\\", "/");
			filePath = filePath.replaceAll(`${publicDir}/`, "");
			return filePath;
		});
		const allPaths = uploadedPaths.toString();
		return res.ok(allPaths);
	}
	else {
		return res.badRequest('No file uploaded.')
	}
});

/**
 * remove temporary uploaded file when deleted by client
 * @category  Controller / Route
*/
router.post('/remove_temp_file', function (req: HttpRequest, res: HttpResponse, next) {
	let file = req.body.temp_file;
	if (file) {
		uploader.removeTempFile(file);
		return res.ok("File deleted");
	}
	return res.badRequest("Invalid temp file")
});
export default router;