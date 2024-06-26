import { 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    signInWithPopup, 
    updateProfile } from "firebase/auth";
import { FirebaseAuth } from "./config";


const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async() => {
    try {
        const result = await signInWithPopup(FirebaseAuth, googleProvider);
        // const credentials = GoogleAuthProvider.credentialFromResult( result );
        const user = result.user

        const {displayName, email, photoURL, uid} = result.user

        return {
            ok: true,
            // user info
            displayName, email, photoURL, uid,
        }

    } catch (error) {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;

        return {
            ok: false,
            errorMessage
        }
    }
}

export const registerUserWithEmailPassword = async({email, password, displayName}) => {
    try {
        
        const resp = await createUserWithEmailAndPassword(FirebaseAuth, email, password);
        console.log(resp);
        const {uid, photoURL} = resp.user;

        // updates the data ofthe currently signed un user found with FirebaseAuth.currentUser
        await updateProfile( FirebaseAuth.currentUser, {displayName} );

        return {
            ok: true,
            uid, photoURL, email, password, displayName
        }

    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        }        
    }
}

export const loginWithEmailPassword = async ({email, password}) => {
    try {
        const resp = await signInWithEmailAndPassword(FirebaseAuth, email, password);
        console.log(resp.user);
        const {uid, photoURL, displayName} = resp.user;
        
        return {
            ok: true,
            uid, photoURL, displayName
        }
    } catch (error) {
        return {
            ok: false,
            errorMessage: error.message
        } 
    }
}

export const logOutFirebase = async() => {
    return await FirebaseAuth.signOut();
}