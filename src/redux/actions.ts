import { Dispatch } from "redux";
import { slicedStore } from "./slices";
import { toast } from "react-toastify";

export const setLoggedInUser = () => async (dispatch: Dispatch) => {
  try {
    const options = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    };
    const URL = `${process.env.REACT_APP_API_URL}/users/me`;
    const res = await fetch(URL, options);
    const data = await res.json();
    if (res.ok) {
      dispatch({ type: slicedStore.actions.setUser, payload: data });
      localStorage.setItem("loggedInUserID", data._id);
    } else {
      toast.error("Session expired, log in again!");
    }
  } catch (error) {
    toast.error(String(error));
  }
};
