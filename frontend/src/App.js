import { Routes, Route } from 'react-router-dom';

import IndexLayout from 'layouts/IndexLayout';
import MainLayout from 'layouts/MainLayout';
import Table1List from 'pages/table1/List';
import Table1View from 'pages/table1/View';
import Table1Add from 'pages/table1/Add';
import Table1Edit from 'pages/table1/Edit';
import HomePage from './pages/home/HomePage';
import IndexPages from './pages/index';
import ErrorPages from './pages/errors';
import 'primereact/resources/primereact.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import 'assets/styles/layout.scss';
const App = () => {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route path="/" element={<HomePage />} />
				<Route path="/home" element={<HomePage />} />
				

				{/* table1 pages routes */}
				<Route path="/table1" element={<Table1List />} />
				<Route path="/table1/:fieldName/:fieldValue" element={<Table1List />} />
				<Route path="/table1/index/:fieldName/:fieldValue" element={<Table1List />} />
				<Route path="/table1/view/:pageid" element={<Table1View />} />
				<Route path="/table1/add" element={<Table1Add />} />
				<Route path="/table1/edit/:pageid" element={<Table1Edit />} />
			</Route>
			<Route exact element={<IndexLayout />}>
				<Route path="/*" element={<IndexPages />} />
				<Route path="/error/*" element={<ErrorPages />} />
			</Route>
		</Routes>
	);
}
export default App;
