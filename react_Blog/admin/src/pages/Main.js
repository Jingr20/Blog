import {BrowserRouter as Router,Routes,Route} from 'react-router-dom';

import Login from './Login';
import AdminIndex from './AdminIndex';
import AddArticle from './AddArticle';
import ArticleList from  './ArticleList';

function Main(){
    return (
        <div>
            <Router>
                <Routes>
                    <Route path='/' element={<Login/>}></Route>
                    <Route path='/index' element={<AdminIndex/>}>
                        {/* <AdminIndex>组件内部使用react-router-dom的Outlet进行占位 */}
                        <Route path='/index/' element={<AddArticle/>}></Route>
                        <Route path='/index/addArticle' element={<AddArticle/>}></Route>
                        <Route path='/index/addArticle/:id' element={<AddArticle/>}></Route>
                        <Route path='/index/list' element={<ArticleList/>}></Route>
                    </Route>
                </Routes>
            </Router>
        </div>
    ); 
}

export default Main;