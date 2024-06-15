import { FirebaseDB } from "../../firebase/config";
import { setDoc, collection, doc } from "firebase/firestore/lite";
import { savingNewNote, addNewEmptyNote, setActiveNote, setNotes } from "./journalSlice";
import { loadNotes } from "../../helpers";

export const startNewNote = () => {
    return async( dispatch, getState /* obtains the data of all the states in the store */) => {

        dispatch( savingNewNote() );

        const {uid} = getState().auth;

        const newNote = {
            title: '',
            body: '',
            date: new Date().getTime(),
            imageUrls: [],
        }

        const newDoc = doc( collection( FirebaseDB, `${uid}/journal/notes` ) );
        await setDoc(newDoc, newNote);

        // adding id
        newNote.id = newDoc.id

        dispatch( addNewEmptyNote(newNote) );
        dispatch( setActiveNote(newNote) );
    }
}

export const startLoadingNotes = () => {
    return async (dispatch, getState) => {
        const {uid} = getState().auth;
        if (!uid) throw new Error('UID does not exits');

        const notes = await loadNotes(uid);
        dispatch( setNotes(notes) );
    }
}