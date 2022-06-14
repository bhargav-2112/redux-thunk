import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import {useSelector, useDispatch} from 'react-redux'
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { Profile } from './components/Profile';
import BoardUser from './components/BoardUser';
import BoardModerator from './components/BoardModerator';
import BoardAdmin from './components/BoardAdmin';
import { useEffect,useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { clearMessage } from './actions/message';
import {history} from './helpers/history';
import { logout } from "./actions/auth";

function App() {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const {user:currentUser} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    history.listen((location) => {
      dispatch(clearMessage());
    });

  }, [dispatch]);

  useEffect(() => {
    if (currentUser) {
      setShowModeratorBoard(currentUser.roles.includes('ROLE_MODERATOR'));
      setShowAdminBoard(currentUser.roles.includes('ROLE_ADMIN'));
    }
  }, [currentUser]);

  const logOut = () => { dispatch(logout()); }  

  return (
    <Router history={history}>
      <div>
        <nav className='navbar navbar-expand navbar-dark bg-dark'>
        <Link to={"/"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/home"} className="nav-link">
                Home
              </Link>
            </li>
            {showModeratorBoard && (
              <li className="nav-item">
                <Link to={"/mod"} className="nav-link">
                  Moderator Board
                </Link>
              </li>
            )}
            {showAdminBoard && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}
            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>
          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>
        <div className="container mt-3">
            <Routes>
              <Route exact path="/" element={<Home/>} />
              <Route exact path="/home" element={<Home/>} />
              <Route exact path="/login" element={<Login/>} />
              <Route exact path="/register" element={<Register/>} />
              <Route exact path="/profile" element={<Profile/>} />
              <Route path="/user" element={<BoardUser/>} />
              <Route path="/mod" element={<BoardModerator/>} />
              <Route path="/admin" element={<BoardAdmin/>} />
            </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
