import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {HomePage} from "./pages/HomePage";
import {ResourceNotFound} from "./pages/ResourceNotFound";
import {AboutPage} from "./pages/AboutPage";
import {ArticlesListPage} from "./pages/ArticlesListPage";
import {ArticlePage} from "./pages/ArticlePage";
import {NavBar} from "./shared/NavBar";

function App() {
  return (
        <Router>
            <div className='App'>
                <NavBar />
                <div id='page-body'>
                    <Routes>
                        <Route path='/' element={<HomePage />}/>
                        <Route path='/about' element={<AboutPage/>}/>
                        <Route path='/articles' element={<ArticlesListPage />} />
                        <Route path='/article/:name' element={<ArticlePage />} />
                        <Route path='*' element={<ResourceNotFound />}/>
                    </Routes>
                </div>
            </div>

        </Router>

  );
}

export default App;
