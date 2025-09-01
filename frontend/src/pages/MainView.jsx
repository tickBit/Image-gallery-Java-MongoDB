import { useEffect, useState } from 'react';
import {useNavigate} from 'react-router';
import {useSelector, useDispatch} from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';

import { fetchPics, reset } from '../features/pics/picSlice'; // import the thunk
import UploadForm from '../components/UploadForm';
import { useAuth } from '../AuthContext';
import Spinner from '../components/Spinner';
import PleaseLogin from '../components/PleaseLogin';


function MainView() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token, authUsername } = useAuth();
    const [ menuVisible, setMenuVisible ] = useState(false);
    const [ picId, setPicId ] = useState(-1);
    const { pics, isLoading } = useSelector((state) => state.pic);

    const toggleMenu = (id) => {
        setPicId(id);
        setMenuVisible(!menuVisible);
    };

    const cancel = () => {
        setPicId(-1);
        setMenuVisible(false);
    };

    async function deletePic(id) {
        
        if (!token) return;            

            await axios.delete(`http://localhost:8080/api/v1/pics/deletePic/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            }).then((res) => {

                console.log(res);

                // Remove picture from state of Redux
                dispatch({
                    type: 'pic/deleteOne',
                    payload: id
                })}).catch((err) => {
                    if (err.status === 401 || err.status === 403) {
                        toast.error('Perhaps token expired. Please log out and then log in again');
                    }
                    console.log(err);
                });
            }


    useEffect(() => {
    
        if (authUsername) {
            dispatch(fetchPics(token));
            
        } else {
            navigate('/');
        }

        // this is done when component is unmounted
        return () => {
            dispatch(reset())
        }

    }, [navigate, dispatch, token, authUsername]);

    return (
        <div className="page">
            {token !== null ? (
                <div>
                    <h2>Main page for user {authUsername}</h2>

                    <UploadForm />

                    <div className='picture-area'>
                        {!isLoading ? (
                            <div>
                                {pics.length > 0 ? (
                                    pics.map((picture) => (
                                        <div className='picture' key={'_' + picture.id}>
                                            {menuVisible && picId === picture.id ? (
                                                <div key={'__' + picture.id}>
                                                    <p onClick={cancel} className='cancel'>Cancel</p>
                                                    <p onClick={() => deletePic(picture.id)} className='close'>Confirm delete picture</p>
                                                    <img src={`data:image/jpeg;base64,${picture.image}`} width="350" height="350" alt='' />
                                                    <p>{picture.description}</p>
                                                </div>
                                            ) : (
                                                <div key={'__' + picture.id}>
                                                    <p onClick={() => toggleMenu(picture.id)} className='close'>Delete picture</p>
                                                    <img src={`data:image/jpeg;base64,${picture.image}`} width="350" height="350" alt='' />
                                                    <p>{picture.description}</p>
                                                </div>
                                            )}
                                        </div>
                                    ))
                                ) : (
                                    <p>No images.</p>
                                )}
                            </div>
                        ) : (
                            <p>Perhaps token expired. Please log out and then log in again</p>
                        )}
                    </div>

                </div>
            ) : (
                <PleaseLogin />
            )}
        </div>
    )
}
               

            
export default MainView