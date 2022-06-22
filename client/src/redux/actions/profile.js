import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { GET_PROFILE, PROFILE_ERROR } from './type';

//get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/me');
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//create and update profile
export const createProfile = (profile) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  dispatch({
    type: '',
    payload: profile,
  });

  try {
  } catch (err) {}
};
