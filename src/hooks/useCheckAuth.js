import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { FirebaseAuth } from "../firebase/config";
import { login, logout } from "../store/auth";

export const useCheckAuth = () => {
    // obtains the status of the signed in user
    const { status } = useSelector(state => state.auth);
    const dispatch = useDispatch();

    useEffect( ()=>{
        // checks for the status of the autentication, this function comes from firebase
        onAuthStateChanged(FirebaseAuth, async(user) => {
            if (!user) return dispatch(logout());

            const {uid, email, displayName, photoURL} = user;
            dispatch(login({uid, email, displayName, photoURL}));
        })
    }, []);

    return status
}
