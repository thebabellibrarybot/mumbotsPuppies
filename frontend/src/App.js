import React from 'react'
import { BrowserRouter as Router, Route, Routes} from  'react-router-dom';

import Home from './components/home';

// specific themes
//import './components/scss/_main.scss';
// global themes
//import './styles/main.css';

function App() {

  return (
      <div className='app'>
        <div className='content'>
        <Router>
          
          <Routes>
            <Route path = "/" element = {<Home/>}/>
          </Routes>

          </Router>
        </div>
      </div>
    );
}

export default App;