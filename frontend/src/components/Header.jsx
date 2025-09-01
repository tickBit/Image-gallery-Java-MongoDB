import { useState } from 'react';
import { useSelector } from 'react-redux';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import { Link } from 'react-router';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from '../AuthContext';

function Header() {

  const navigate = useNavigate();

  const { logout, token } = useAuth();
  const { pics } = useSelector((state) => state.pic);
  const [ deleteUser, setDeleteUser ] = useState(false);

  // Before deleting user's account, check from state, if user has saved pictures;
  // if the user does, user won't be deleted (this would work without that check too, though)
  const handleDelete = async (e) => {
    e.preventDefault();
  
    if (pics.length > 0) {
      toast.error("You have saved pictures. Please delete them first before deleting your account.");
      return;
    }
    
      await axios.delete('http://localhost:8080/api/v1/auth/deleteme', {
          headers: {
                    'Authorization': `Bearer ${token}`
                   }
                  }
        ).then((res) => {
          console.log(res);
          logout();
          navigate('/');
        }).catch((err) => {
          console.log(err);
          if (err.status === 401 || err.status === 403) {
            toast.error('Perhaps token expired. Please log out and then log in again');
          }
        });
      //} catch (err) {
      //  console.log(err);
      //}
    }
  

  const onLogout = (e) => {
    console.log("Log out!");
    logout();
  }

  return (
    <div className='container'>

    <header className='header'>
          <div className='menu'>
          {!token ? (<>
          <Link to="/register">
            <span>Register</span>
          </Link>
          <Link to="/login">
            <span><FaSignInAlt /> Login</span>
          </Link>
          </>
          
          ): (<div>
              {!deleteUser ? <div><Link onClick={() => setDeleteUser(true)}><span>Delete my account</span></Link></div>
                           : <div>
                                <span className="alert alert-dark" role="alert">Are you sure, you want to delete your account?</span>
                                <button id="okDel" className="alert alert-danger" role="alert">Ok</button>
                                <button id="cancelDel" className="alert alert-primary" role="alert" onClick={() => setDeleteUser(false)}>Cancel</button>
                            </div>}
          
          <Link onClick={(e) => onLogout(e)}>
            <span >Logout</span>
          </Link>
         </div>) }
          </div>

          <ToastContainer limit={1} newestOnTop />

          <h1>Image Gallery</h1>
          <p>The app uses in-memory authentication: refreshing the page, will log you out.</p>
    </header>

    </div>
    
  );
}

export default Header