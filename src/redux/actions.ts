import { Dispatch } from "redux";
import { slicedStore } from "./slices";

export const setLoggedInUser = () => {
  return async (dispatch: Dispatch) => {
    try {
      const options = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      };
      const URL = `${process.env.REACT_APP_API_URL}/users/me`;
      const res = await fetch(URL, options);
      if (res.ok) {
        const data = await res.json();
        dispatch({ type: slicedStore.actions.setUser, payload: data });
      } else {
        console.log(res.body);
      }
    } catch (error) {
      console.error(error);
    }
  };
};
