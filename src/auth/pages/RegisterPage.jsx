import { Link as RouterLink } from "react-router-dom" // adds the new name to prevents conflicts
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { useState } from "react"

/*sx hace referencia style extended, permite trabajar con la propiedad style y accede al tema 
xs hace referencia a tamaño de pantallas pequeñas, medianas grandes y xxl

variant permite definir el tipo de tag que sera el Typography h1 p h2 etc
*/

// boiler data to show in the fields of register page and use them in the custom hook
// useForm
const formData = {
    email: "",
    password: "",
    displayName: ""
}

// validations for the fields in the form and custom hook 
const formsValidations = {
    email: [(value) => value.includes('@'), 'El correo debe contener un @.'],
    password: [(value) => value.length >= 6, 'El password debe tener más de 6 caracteres.'],
    displayName: [(value) => value.length >= 1, 'El nombre es obligatorio.']
}

export const RegisterPage = () => {

    const [formsSubmited, setFormSubmitted] = useState(false);

    const { 
        displayName, email, password, onInputChange, formState,
        isFormValid, displayNameValid, emailValid, passwordValid, 
    } = useForm(formData, formsValidations);

    const onSubmit = (event) => {
        event.preventDefault();
        setFormSubmitted(true);
    }

  return (
    <AuthLayout title="Crear cuenta">
      <form onSubmit={onSubmit}>
          <Grid container>

          <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Nombre completo" 
                type="text"
                placeholder="Jhon Doe"
                fullWidth
                name="displayName"
                value={displayName}
                onChange={onInputChange}
                error={displayNameValid && formsSubmited}
                helperText={displayNameValid}
                />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Correo" 
                type="email"
                placeholder="example@email.com"
                fullWidth
                name="email"
                value={email}
                onChange={onInputChange}
                error={emailValid && formsSubmited}
                helperText={emailValid}
                />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Contraseña" 
                type="password"
                placeholder="contraseña"
                fullWidth
                name="password"
                value={password}
                onChange={onInputChange}
                error={passwordValid && formsSubmited}
                helperText={passwordValid}
                />
            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt:1}}>
              <Grid item xs={ 12 }>
                <Button variant='contained' fullWidth type="submit">
                  Crear cuenta
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Typography sx={{mr:1}}>¿Ya tienes cuenta?</Typography>
              <Link component={RouterLink} color='inherit' to='/auth/login'>
                Login
              </Link>
            </Grid>

          </Grid>
      </form>
    </AuthLayout>
  )
}
