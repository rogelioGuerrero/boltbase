import { BaseEntity, SelectQueryBuilder } from "typeorm";
export default class BaseModel extends BaseEntity {
	static async findValue(column, where) {
		const row = await this.findOne({where});
		if(row){
			return row[column];
		}
		return null;
	}

	static async paginate(query: SelectQueryBuilder<any>, page: number, limit: number): Promise<{ totalRecords: number; recordCount: number; totalPages: number; records: any[]; }> {
		query.offset(limit * (page - 1));
		query.limit(limit);
		const totalRecords = await query.getCount();
		const records = await query.getRawMany();
		let recordCount = records.length;
		let totalPages = Math.ceil(totalRecords / limit);
		let data = {
			totalRecords,
			recordCount,
			totalPages,
			records
		}
		return data;
	}
}