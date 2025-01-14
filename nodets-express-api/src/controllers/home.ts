
/**
 * Express router providing related routes to page component data
*/
import express from 'express';
import { HttpRequest, HttpResponse } from '../helpers/http';

const router = express.Router();
router.get(['/', '/index'], async function (req:HttpRequest, res:HttpResponse)
{
    res.render('pages/index/welcome.html');
});



export default router;
