import { FirebaseDB } from "../../firebase/config";
import { setDoc, collection, doc } from "firebase/firestore/lite";
import { savingNewNote, addNewEmptyNote, setActiveNote } from "./journalSlice";

export const startNewNote = () => {
    return async( dispatch, getState /* obtains the data of all the states in the store */) => {

        dispatch( savingNewNote() );

        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) );
        await setDoc(newDoc, newNote);

        // adding id
        newNote.id = newDoc.id

        dispatch( addNewEmptyNote(newNote) );
        dispatch( setActiveNote(newNote) );
    }
}
