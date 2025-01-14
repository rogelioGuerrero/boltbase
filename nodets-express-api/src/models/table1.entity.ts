
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import BaseModel from './basemodel';

//2lines
@Entity({ name: 'Table1' })
export default class Table1 extends BaseModel {
	static getQuery(){
		return this.createQueryBuilder("Table1");
	}
	
	@PrimaryGeneratedColumn({name: 'id'})
	id: number

	@Column({name: 'nombre' })
	nombre: string
	
	
	
	
	static listFields(): string[]{
		return [
			"id", 
			"nombre"
		];
	}

	static exportListFields(): string[]{
		return [
			"id", 
			"nombre"
		];
	}

	static viewFields(): string[]{
		return [
			"id", 
			"nombre"
		];
	}

	static exportViewFields(): string[]{
		return [
			"id", 
			"nombre"
		];
	}

	static editFields(): string[]{
		return [
			"id", 
			"nombre"
		];
	}

	
	static searchFields(): string{
		const fields = [
			"id LIKE :search", 
			"nombre LIKE :search",
		];
		return '(' + fields.join(' OR ') + ')';
	}

	
	
}


