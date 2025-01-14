/**
 * Express router providing  related routes
*/
import express from 'express';
import DB from '../datasource';
import { HttpRequest, HttpResponse } from '../helpers/http';
import { body }  from 'express-validator';
import validateFormData from '../helpers/validate_form';
import { In } from 'typeorm';
const Table1 = DB.Table1;
const router = express.Router();




/**
 * Route to list table1 records
 * @route {GET} /table1/index/{fieldname}/{fieldvalue}
 */
router.get(['/', '/index/:fieldname?/:fieldvalue?'], async (req:HttpRequest, res:HttpResponse) => {  
	try{
		const query = Table1.getQuery();
		
		const fieldName = req.params.fieldname;
		const fieldValue = req.params.fieldvalue;
		const search = req.query.search;
		const page = Number(req.query.page) || 1;
		const limit = Number(req.query.limit) || 10;
		
		if (fieldName){
			 //filter by a single column values
			query.where(`${fieldName}=:fieldValue`, {fieldValue});
		}
		
		
		if(search){
			let searchFields = Table1.searchFields(); // get columns to search
			query.andWhere(searchFields, {search: `%${search}%`});
		}
		
		const selectFields = Table1.listFields(); //get columns to select
		query.select(selectFields);
		
		// order by field
		const orderBy = req.getOrderBy('id', 'DESC');
		if(orderBy){
			query.orderBy(orderBy.column, orderBy.orderType);
		}
		
		//return records and pager info
		const pageData = await Table1.paginate(query, page, limit);
		
		return res.send(pageData);
	}
	catch(err) {
		console.error("has crached", req.path, err);
		return res.serverError(err);
	}
});


/**
 * Route to view Table1 record
 * @route {GET} /table1/view/{recid}
 */
router.get('/view/:recid', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let recid = req.params.recid;
		let query = Table1.getQuery();
		query.where("id=:recid", { recid });
		let selectFields = Table1.viewFields();
		query.select(selectFields);
		let record = await query.getRawOne();
		if(!record){
			return res.recordNotFound();
		}
		return res.send(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to insert Table1 record
 * @route {POST} /table1/add
 */
router.post('/add/' , 
	[
		body('nombre').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async function (req:HttpRequest, res:HttpResponse) {
	try{
		let modeldata = req.getValidFormData();
		
		//save Table1 record
		let record = await Table1.save(modeldata);
		
		return res.send(record);
	} catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to get  Table1 record for edit
 * @route {GET} /table1/edit/{recid}
 */
router.get('/edit/:recid', async (req:HttpRequest, res:HttpResponse) => {
	try{
		let recid = req.params.recid;
		let query = Table1.getQuery();
		const editFields = Table1.editFields(); // get fields to edit
		query.where("id=:recid", { recid });
		query.select(editFields);
		let record = await query.getRawOne();
		if(!record){
			return res.recordNotFound();
		}
		return res.send(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to update  Table1 record
 * @route {POST} /table1/edit/{recid}
 */
router.post('/edit/:recid' , 
	[
		body('nombre').optional({nullable: true, checkFalsy: true}),
	], validateFormData
, async (req:HttpRequest, res:HttpResponse) => {
	try{
		const recid = req.params.recid;
		
		const editFields = Table1.editFields();  // get fields to edit
		
		let modeldata = req.getValidFormData({ includeOptionals: true });
		const query = Table1.getQuery();
		query.where("id=:recid", { recid });
		query.select(editFields);
		const record = await query.getRawOne();
		if(!record){
			return res.recordNotFound();
		}
		Object.assign(record, modeldata); // update record with form input
		await query.update().set(modeldata).execute();
		return res.send(record);
	}
	catch(err){
		return res.serverError(err);
	}
});


/**
 * Route to delete Table1 record by table primary key
 * Multi delete supported by recid separated by comma(,)
 * @route {GET} /table1/delete/{recid}
 */
router.get('/delete/:recid', async (req:HttpRequest, res:HttpResponse) => {
	try{
		const recid = (req.params.recid || '').split(',');
		const query = Table1.getQuery();
		query.where({'id': In(recid)});
		 
		const records = await query.getMany();
		if(!records){
			return res.recordNotFound();
		}
		records.forEach(async (record) => { 
			//perform action on each record before delete
		});
		
		const result = await query.delete().execute();
		
		return res.send(recid);
	}
	catch(err){
		return res.serverError(err);
	}
});
export default router;
