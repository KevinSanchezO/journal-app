import { signInWithGoogle } from "../../firebase/providers";
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
