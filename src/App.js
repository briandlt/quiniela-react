import { useState } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import SessionContext from './Context/SessionContext'
import './App.css';
// pages
import Home from './Pages/Home'
import Quiniela from './Pages/Quiniela'
import AddResults from './Pages/AddResults'
import Regulation from './Pages/Regulation'
import Positions from './Pages/Positions'

function App() {
  const [session, setSession] = useState(JSON.parse(sessionStorage.getItem('manager')))
  const value = {session, setSession}
  return (
    <div className="App">
      <SessionContext.Provider value={value}>
        <Router>
          <Switch>
            <Route path="/quiniela">
              <Quiniela />
            </Route>
            <Route path="/positions">
              <Positions />
            </Route>
            <Route path="/regulation">
              <Regulation />
            </Route>
            <Route path="/addresults">
              <AddResults />
            </Route>
            <Route path="/users">
              <Link to='/'>Home</Link>
              <Link to='/Quiniela'>Quiniela</Link>
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Router>
      </SessionContext.Provider>
    </div>
  );
}

export default App;
