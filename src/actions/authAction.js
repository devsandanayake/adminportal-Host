import axiosInstance from '../axiosConfig';
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
} from './types';

export const loginRequest = () => ({
  type: LOGIN_REQUEST,
});

export const loginSuccess = (user) => ({
  type: LOGIN_SUCCESS,
  payload: user,
});

export const loginFailure = (error) => ({
  type: LOGIN_FAILURE,
  payload: error,
});

export const logout = () => ({
  type: LOGOUT,
});

export const login = (credentials) => {
  console.log('credentials', credentials);
  return (dispatch) => {
    dispatch(loginRequest());
    const formData = new URLSearchParams();
    formData.append("grant_type", "password");
    formData.append("client_id", "751806cafdba7f3e8d05bf87888c434e");
    formData.append("client_secret", "a2a7aca536c8b067390ff33cbaa99b122395bf5a9aa51d64522e97f2133e78c28ce6917a094416bcccafeb1b1e327794fcb691b24752c4a0073364cc3dd62b75");
    formData.append("scope", "internalclientweb");
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    axiosInstance
      .post("/token", formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded", // Explicitly set content type
        },
      })
      .then((response) => {
        const token = response.data.access_token;
        localStorage.setItem("token", token);
        dispatch(loginSuccess(token));
      })
      .catch((error) => {
        console.error(
          "Login error:",
          error.response ? error.response.data : error.message
        );
        dispatch(
          loginFailure(
            error.response ? error.response.data.error_description : error.message
          )
        );
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem('token');
    dispatch(logout());
  };
};
