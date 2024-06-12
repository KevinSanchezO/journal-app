import { loginWithEmailPassword, registerUserWithEmailPassword, signInWithGoogle } from "../../firebase/providers";
import { checkingCredentials, login, logout } from "./authSlice"

export const checkingAuthentication = (email, password) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

    }
}

/**
 * handles the signIn with Google starts the "Checking" state from authSlice
 * opens the window to sign in with Google and call either logout or login depending on
 * the result of the authentication
 */
export const startGoogleSignIn = () => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const result = await signInWithGoogle();
        if (!result.ok) return dispatch(logout(result.errorMessage));

        dispatch( login(result) );
    }
}

/**
 * handles the creation of new users using the register route, starts the "Checking" state from authSlice
 * to ten call registerUserWithEmailPassword in provider and authenticate the new created user
 */
export const startCreatingUserWithEmailPassword = ({email, password, displayName}) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );

        const { ok, uid, photoURL, errorMessage } = await registerUserWithEmailPassword({email, password, displayName});

        if (!ok) return dispatch(logout({errorMessage}))

        dispatch( login({uid, photoURL, displayName, email}) );
    }
}

export const startLoginWithEmailPassword = ({email, password}) => {
    return async( dispatch ) => {
        dispatch( checkingCredentials() );
        
        const result = await loginWithEmailPassword({email, password});

        if (!result.ok) return dispatch(logout(result));

        dispatch (login(result));
    }
}