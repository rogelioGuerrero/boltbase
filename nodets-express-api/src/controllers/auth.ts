import express from 'express';
import { HttpRequest, HttpResponse } from '../helpers/http';
const router = express.Router();
router.get('/index', function (req:HttpRequest, res:HttpResponse)
{
    //res.render('index/index');
});
export default router;
