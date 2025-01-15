import express from 'express';
import { HttpRequest, HttpResponse } from '../helpers/http';

const router = express.Router();
router.get(['/', '/index'], async function (req:HttpRequest, res:HttpResponse) {
	
});

export default router;
