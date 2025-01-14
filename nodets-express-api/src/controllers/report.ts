

/**
* Report Contoller Class
* @category  Controller
*/

//allimports

const router = express.Router();

router.post('/',  (req:HttpRequest, res:HttpResponse) => {
	let title = req.body.title || '';
	data = req.body.data || ''
	res.render('layouts/report.ejs', {title, data, config});
});

export default router;
