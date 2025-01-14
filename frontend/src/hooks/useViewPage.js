import { useEffect, useState, useMemo } from "react";
import { useParams } from 'react-router-dom';
import { confirmDialog } from 'primereact/confirmdialog';
import useApp from 'hooks/useApp';
import { useQuery, useQueryClient } from 'react-query';
import useApi from 'hooks/useApi';
const useViewPage = (props) => {
	const app = useApp();
	const api = useApi();
	const queryClient = useQueryClient();
	const { pageid } = useParams();
	let id = props.id || pageid; // get id when passed via props or from url param
	id = id || ''; // set to null if undefined
	const [recID, setRecID] = useState(id);
	const [pageReady, setPageReady] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);
	const [currentRecord, setCurrentRecord] = useState(null);
	const url = `${props.apiPath}/${encodeURIComponent(recID)}`;
	const { isLoading, isError, data, error } = useQuery([props.pageName, url], () => fetchRecords(), { retry: false, });
	useEffect(() => {
		if (data) {
			setCurrentRecord(data);
			setPageReady(true);
		}
	}, [data, isError]);
	function fetchRecords() {
		return api.get(url).then((res) => res?.data);
	}
	async function deleteItem(id) {
		if (id) {
			const title = props.msgTitle;
			const prompt = props.msgBeforeDelete;
			confirmDialog({
				message: prompt,
				header: title,
				icon: 'pi pi-exclamation-triangle',
				accept: async () => {
					try {
						setIsDeleting(true);
						const recid = encodeURIComponent(id.toString());
						const url = `${props.pageName}/delete/${recid}`;
						await api.get(url);
						queryClient.invalidateQueries(props.pageName);
						setIsDeleting(false);
						if (app.isDialogOpen()) {// view page is open as a dialog
							app.closeDialogs()
						}
						else {
							app.navigate(`/${props.pageName}`); // navigate back
						}
						app.flashMsg(title, props.msgAfterDelete);
					}
					catch (err) {
						app.showPageRequestError(err);
					}
				},
				reject: () => {
					//callback to execute when user rejects the action
				}
			});
		}
	}
	function moveToNextRecord () {
		setRecID(data?.nextRecordId);
	}
	function moveToPreviousRecord () {
		setRecID(data?.previousRecordId);
	}
	const pageData = {
		currentRecord,
		item: currentRecord,
		pageReady,
		loading: isLoading || isDeleting,
		apiRequestError: error,
		deleteItem,
		moveToNextRecord,
		moveToPreviousRecord
	}
	return useMemo(() => pageData,
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[currentRecord, pageReady, isLoading, isDeleting, error]
	);
}
export default useViewPage;