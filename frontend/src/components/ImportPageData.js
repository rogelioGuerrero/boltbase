import React, { useState, useEffect } from "react";
import useApp from 'hooks/useApp';

import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { Uploader } from 'components/Uploader';

const ImportPageData = (props) => {
	const app = useApp();
	const { uploadPath, buttonLabel, buttonIcon, buttonTitle, dragDropMsg } = props;
	const [showDialog, setShowDialog] = useState(false);

	function uploadCompleted(response) {
		props.onImportCompleted(response);
	}

	function uploadError(error) {
		app.flashMsg('Upload error', error, 'error')
	}

	return (
		<>
			<Button onClick={() => setShowDialog(!showDialog)} label={buttonLabel} tooltip={buttonTitle} icon={buttonIcon} />
			<Dialog draggable={false} modal={false} header="Import Data" visible={showDialog} onHide={() => setShowDialog(false)} position="bottom" breakpoints={{ '960px': '50vw', '640px': '95vw' }} style={{ width: '30vw' }}>
				<div>
					<Uploader showUploadedFiles={false} uploadPath={uploadPath} onUploadError={(err) => uploadError(err)} onUploadCompleted={(response) => uploadCompleted(response)} fileLimit={1} maxFileSize={10} accept=".csv" multiple={false} label={dragDropMsg} />
				</div>
			</Dialog>
		</>
	);
}

ImportPageData.defaultProps = {
	uploadPath: 'fileuploader/upload/import',
	buttonLabel: 'Import Data',
	buttonTitle: 'Import Data',
	buttonIcon: 'pi pi-print',
	dragDropMsg: 'Choose file to import',
	onImportCompleted: () => { }
}

export { ImportPageData };