import { HttpRequest, HttpResponse } from './http';

/**
* Role Based Access Control
* @category  RBAC Helper
*/

//pages to exclude from access authorization check
let excludePages = ['account', 'components_data', 'fileuploader', 's3uploader'];

export class Rbac {
	AUTHORIZED = "authorized";
	FORBIDDEN = "forbidden";
	UNKNOWN_ROLE = "unknown_role";
	userPages = [];
	userRole = null;
	constructor(role) {
		this.userRole = role;
	}

	async getUserPages() {
		//not implemented
		return this.userPages;
	}

	async getRoleNames() {
		//not implemented
		let roles = [];
		return roles;
	}

	getPageAccess(path: string) {
		//not implemented
		return this.AUTHORIZED;
	}
}

async function RbacMiddleWare(req: HttpRequest, res: HttpResponse, next) {
	// not implemented
	return next();
}

export default RbacMiddleWare;