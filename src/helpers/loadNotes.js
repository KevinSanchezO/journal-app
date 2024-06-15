import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

/**
 * Retrieves the data of all the notes of the user
 */
export const loadNotes = async( uid = '') => {
    if (!uid) throw new Error('UID does not exits');

    const collectionRef = collection(FirebaseDB, `${uid}/journal/notes`);
    const docs = await getDocs(collectionRef);

    const notes = [];
    // cleans all the data to only have access to the important information of the notes
    docs.forEach( doc => {
        notes.push({id: doc.id, ...doc.data()});
    })

    return notes;
}