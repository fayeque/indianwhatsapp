import React,{Fragment} from 'react';
import Sidebar from "./Sidebar";
import Login from "./Login";
import Chat from "./Chat";
import {useStateValue} from "./StateProvider"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import './App.css';

function App() {
  const [{user},dispatch] = useStateValue();
  const [show,setShow] = useState(true);
  return (
    <div className="app">
    <Router>
    {!user ? (<Login />) : (
      <Fragment>
      <div className="app__body">
      {show && <Sidebar setShow={setShow} />}
      <Switch>
        <Route exact path="/room/:roomId" component={Chat} />
      </Switch>
      </div>
      </Fragment>
    )
    }
    </Router>
    </div>
  );
}

export default App;
