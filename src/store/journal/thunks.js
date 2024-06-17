import { FirebaseDB } from "../../firebase/config";
import { setDoc, collection, doc, deleteDoc } from "firebase/firestore/lite";
import { savingNewNote, addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNoteById } from "./journalSlice";
import { fileUpload, loadNotes } from "../../helpers";

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

export const startSaveNote = () => {
    return async(dispatch, getState) => {

        dispatch(setSaving());

        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const noteToFirestore = {...note}; // creates a copy from the state
        delete noteToFirestore.id; //deletes a property from the state

        const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` )
        await setDoc(docRef, noteToFirestore, { merge: true }); // merge indicates that all data not present in the request doesn't change in the db

        dispatch(updateNote(note));
    }
}

export const startUploadingFiles = (files={}) => {
    return async( dispatch ) => {
        dispatch(setSaving());

        const fileUploadPromises = []; //contains all the promises of the images to upload

        // creates the requests
        for (const file of files) {
            fileUploadPromises.push( fileUpload(file) );
        }
        
        const photosUrls = await Promise.all(fileUploadPromises); //with Promise.all it starts to create all the requests of all the images simultaneously

        dispatch( setPhotosToActiveNote(photosUrls) );
    }
}

export const startdDeletingNote = () => {
    return async(dispatch, getState) => {
        const { uid } = getState().auth;
        const { active:note } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);

        const res = await deleteDoc(docRef);

        dispatch( deleteNoteById(note.id) );
    }
}