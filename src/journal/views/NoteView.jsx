import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material";
import { Button, Grid, IconButton, TextField, Typography } from "@mui/material";
import { ImageGallery } from "../components/ImageGallery";
import { useForm } from "../../hooks/useForm";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startSaveNote, startUploadingFiles, startdDeletingNote } from "../../store/journal/thunks";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';


// Un box es como un div, el grid permite jugar con el orden de los elementos
export const NoteView = () => {

    const dispatch = useDispatch();
    const {active:note, messageSave, isSaving} = useSelector(state => state.journal);
    const {body, title, onInputChange, formState, date } = useForm( note );

    /**
     * Everytime the current node is modified the modified text of it will 
     * render at the same time or once is saved to be more precised.
     */
    useEffect(() => {
        dispatch(setActiveNote(formState));
    },[formState])

    /**
     * checks if a note has been saved and shows a message to notify the user
     */
    useEffect(() => {
        if  (messageSave.length > 0 ) {
            Swal.fire('Nota Actualizada', messageSave, 'success');
        }  
    }, [messageSave])
    

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date])

    const onSaveNote = () => {
        dispatch(startSaveNote());
    }

    /**
     * simulates a click of the input file so the IconButton is the one that needs to be clicked
     * in order to load images
     */
    const fileInputRef = useRef();

    const onFileInputChange = ({target}) => {
        if (target.files === 0) return;

        dispatch( startUploadingFiles(target.files) );
    }

    const onDelete = () => {
        dispatch( startdDeletingNote() );

        Swal.fire('Nota Eliminada', messageSave, 'success');
    }

    return (
        <Grid 
            container 
            className="animate__animated animate__fadeIn animate__faster"
            direction='row' justifyContent='space-between' alignItems={'center'} sx={{mb:1}}
        >
            <Grid item>
                <Typography fontSize={39} fontWeight={'light'}>{dateString}</Typography>
            </Grid>

            <Grid item>
                <input
                    type="file"
                    multiple
                    onChange={onFileInputChange}
                    style={{display:'none'}}
                    ref={fileInputRef}
                />

                <IconButton 
                color='primary' 
                disabled={isSaving}
                onClick={() => fileInputRef.current.click()}>
                    <UploadOutlined />
                </IconButton>

                <Button color='primary' sx={{padding: 2}} onClick={onSaveNote} disabled={ isSaving }>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1}}/>
                    Guardar
                </Button>
            </Grid>

            <Grid container>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un titulo"
                    label="Titulo"
                    sx={{border: "none", mb:1}}
                    name="title"
                    value={ title }
                    onChange={onInputChange}
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedio el día de hoy?"
                    sx={{border: "none", mb:1}}
                    minRows={5}
                    name="body"
                    value={ body }
                    onChange={onInputChange}
                />
            </Grid>

            <Grid container justifyContent='end'>
                <Button
                    onClick={onDelete}
                    sx={{mt:2}}
                    color="error"
                >
                    <DeleteOutline />
                    Borrar
                </Button>
            </Grid>

            <ImageGallery images={note.imageUrls}/>

        </Grid>
  )
}
