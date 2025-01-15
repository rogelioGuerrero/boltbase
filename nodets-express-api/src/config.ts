export default {
	app: {
		name: "boltBase",
		url: "http://localhost:8060",
		frontendUrl: "http://localhost:8050",
		secret: "c02e58b5e2152d88d6370ea1d2ca3341",
		language: "spanish",
		publicDir: "public",
	},
	meta: {
		author:"",
		description: "__metadescription",
		charset: "UTF-8",
	},
	auth: {
		userTokenSecret: "477f028A-1ax%W@e4356YY6Q!!0-59782cd9d9e4533b2543",
		apiTokenSecret: "af7ae7f8$Xax%W!7ae859B#Q-!07ed51756fecb1196b861f",
		jwtDuration: 30, //in minutes
		otpDuration: 5, //in minutes
	},
	database: {
		name:"D:/proyectoBolt/Bolt/boltbase/boltBase.sqlite",
		type: "sqlite",
		host: "localhost",
		username: "root",
		password: "",
		port: "",
		charset: "utf8",
		recordlimit: 10,
		ordertype: "DESC"
	},
	mail: {
		username:"",
		password: "",
		senderemail:"",
		sendername:"",
		host: "",
		secure: true,
		port: ""
	},
	upload: {
		tempDir: "uploads/temp/",
		importdata: {
			filenameType: "timestamp",
			extensions: "csv",
			maxFiles: "10",
			maxFileSize: "3",
			returnFullpath: "false",
			filenamePrefix: "",
			uploadDir: "uploads/files/"
		},
		
	},
	s3: {
		secretAccessKey: "",
		accessKeyId: "",
		region: "us-west-2",
		bucket: "",
	},
	
}
