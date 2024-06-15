import { SaveOutlined } from "@mui/icons-material"
import { Button, Grid, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components/ImageGallery"
import { useForm } from "../../hooks/useForm"
import { useSelector } from "react-redux"
import { useMemo } from "react"


// Un box es como un div, el grid permite jugar con el orden de los elementos
export const NoteView = () => {

    const {active:note} = useSelector(state => state.journal);

    const {body, title, onInputChange, formState, date } = useForm( note );

    const dateString = useMemo(() => {
        const newDate = new Date(date);
        return newDate.toUTCString();
    }, [date])

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
                <Button color='primary' sx={{padding: 2}}>
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

            <ImageGallery />

        </Grid>
  )
}
