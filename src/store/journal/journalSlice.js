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
        },
        setNotes: (state, action) => {
            state.notes = action.payload;
        },
        setSaving: (state) => {

        },
        updateNote: (state, action) => {

        },
        deleteNoteById: (state, action) => {

        },
        resetJournal: (state) => {
            state.isSaving = false;
            state.messageSave = '';
            state.notes = [];
            active: null;
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
    resetJournal } = journalSlice.actions;