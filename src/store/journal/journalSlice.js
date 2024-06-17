import { createSlice } from '@reduxjs/toolkit';

export const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        isSaving: false,
        messageSave: '',
        notes: [],
        active: null, //{id:'', title:'', body:'', date:123456, imageUrls:['https://foto1.png','https://foto2.png','https://foto3.png']}
    },
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true;
        },
        addNewEmptyNote: (state, action) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action) => {
            state.active = action.payload;
            state.messageSave = ``;
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {
            state.isSaving = true;
            state.messageSave = ``;
        },
        updateNote: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.map(
                (note) => {
                    if (note.id == action.payload.id) {
                        return action.payload;
                    }
                    return note;
                }
            );

            state.messageSave = `${action.payload.title} actualizada correctamente.`
        },
        setPhotosToActiveNote: (state, action) => {
            state.active.imageUrls = [ ...state.active.imageUrls, ...action.payload ];
            state.isSaving = false;
        },
        deleteNoteById: (state, action) => {

        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSave = '';
            state.notes = [];
            state.active = null;
        }
    }
});


export const { 
    savingNewNote,
    addNewEmptyNote, 
    setActiveNote, 
    setNotes,
    setSaving,
    updateNote,
    deleteNoteById,
    clearNotesLogout,
    setPhotosToActiveNote} = journalSlice.actions;