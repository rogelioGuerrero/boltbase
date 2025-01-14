import constant from './constants';
import { Request, Response, NextFunction } from 'express';
import sanitizeInput from "./sanitizeinput";
import writeToLog from './auditlog';
const puppeteer = require('puppeteer');

export interface QueryOrderBy extends Request {
	column: string
	orderType: 'ASC' | 'DESC'
}

export interface HttpResponse extends Response {
	ok(msg?: any)
	recordNotFound(msg?: any)
	badRequest(msg?: any)
	forbidden(msg?: any)
	unauthorized(msg?: any)
	serverError(msg?: any)
	generatePdf(msg?: any)
}

export interface HttpRequest extends Request {
	getOrderBy(defaultOrderField: string, defaultOrderType: 'ASC' | 'DESC'): QueryOrderBy
	writeToLog(recid?: any)
	getValidFormData(options?: { includeOptionals?: boolean, onlyValidData?: boolean })
	oldRecord?: any
	newRecord?: any
	apiName?: string
	pageName?: string
	actionName?: string
}

export function HttpMiddleWare(req: HttpRequest, res: HttpResponse, next: NextFunction) {
	// convert blank fields to null.
	// trim string inputs
	if (req.body) {
		sanitizeInput(req.body);
	};

	const path = req.path.replace(/^\/|\/$/g, ''); //Replace all leading and trailing slashes
	const arrPath = path.split('/'); //convert to array ['api', 'pagename', 'actionname']

	req.apiName = arrPath[0] || 'api';
	req.pageName = arrPath[1] || 'index';
	req.actionName = arrPath[2] || 'index';

	req.writeToLog = function (recid: any = null) {
		try {
			const oldValues = JSON.stringify(req.oldRecord);
			const newValues = JSON.stringify(req.newRecord);
			const payload = {
				recid,
				oldValues,
				newValues
			}
			writeToLog(req, payload);
		}
		catch (err) {

		}
	}

	req.getOrderBy = function (defaultOrderField: string, defaultOrderType: string = 'DESC'): QueryOrderBy {
		const orderField = String(req.query.orderby || defaultOrderField);

		const orderType = String(req.query.ordertype || defaultOrderType).toUpperCase() as 'ASC' | 'DESC'
		if (orderField) {
			const orderBy = {
				column: orderField,
				orderType
			} as QueryOrderBy
			return orderBy
		}
		return null;
	}

	res.ok = function (message) {
		return res.send(message)
	}

	res.recordNotFound = function (message) {
		message = message || constant.RecordNotFound;
		return res.status(404).send(message)
	}

	res.badRequest = function (message) {
		message = message || constant.BadRequest;
		return res.status(400).send(message)
	}

	res.forbidden = function (message) {
		message = message || constant.AccessForbbiden;
		return res.status(403).send(message)
	}

	res.unauthorized = function (message) {
		message = message || constant.UnauthorizedAccess;
		return res.status(401).send(message)
	}

	res.serverError = function (message) {
		console.log("\n\n-------------------------- Exception Stack Trace --------------------------\n\n")
		console.error("Server Request Error", message);
		console.log("\n\n-------------------------- End of Exception Stack Trace --------------------------\n\n")
		return res.status(500).send(constant.ServerError)
	}

	res.generatePdf = async function ({ html, filename, puppeteerConfig, mediaType }) {
		const browser = await puppeteer.launch({ headless: true });
		// Create a new page
		const page = await browser.newPage();
		await page.setContent(html, { waitUntil: 'domcontentloaded' });

		if (mediaType) {
			// To reflect CSS used for screen instead of print
			await page.emulateMediaType(mediaType);
		}

		// Downlaod the PDF
		const pdf = await page.pdf(puppeteerConfig);

		// Close the browser instance
		await browser.close();
		this.attachment(`${filename}.pdf`);
		this.contentType("application/pdf");
		return this.send(pdf);
	}

	return next();
}