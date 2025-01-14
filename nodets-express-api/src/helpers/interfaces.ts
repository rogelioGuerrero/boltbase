export interface UploadSettings {
	maxFileSize: number,
	maxFiles: number,
	filenameType: string,
	filenamePrefix: string,
	uploadDir: string,
	extensions: string,
	returnFullpath: boolean,
	imageResize: ImageResize[],
}
export interface ImageResize {
	name: string,
	mode: string,
	width: number,
	height: number,
}

export interface fileInfo {
	filepath: string,
	fileurl: string,
	filename: string,
	filetype: string,
	filesize: string,
	fileext: string
}