import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link as RouterLink } from "react-router-dom" // adds the new name to prevents conflicts
import { Alert, Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"

import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { startGoogleSignIn, startLoginWithEmailPassword } from "../../store/auth"


const formData = {
    email: "kevin@google.com",
    password: "123456"
}

/*sx hace referencia style extended, permite trabajar con la propiedad style y accede al tema 
xs hace referencia a tamaño de pantallas pequeñas, medianas grandes y xxl

variant permite definir el tipo de tag que sera el Typography h1 p h2 etc
*/

export const LoginPage = () => {

    // gives access to the reducers or async functions that access the reducers
    const dispatch = useDispatch();

    // gives access to the status state in the store, to be more precise in authSlice
    const { status, errorMessage } = useSelector( state => state.auth );

    const { email, password, onInputChange, formState } = useForm(formData);

    /**
     * 
     * React Hook that stores in cache a result between renders
     * stores the value of status from authSlice to keep track of it even when it changes and
     * re-renders the page
     */
    const isAuthenticating = useMemo( () => status === "checking", [status]);

    const onSubmit = (event) => {
        event.preventDefault();

        //calls an async function in the thunk
        dispatch(startLoginWithEmailPassword({email, password}));
    }

    const onGoogleSignIn = () => {
        //calls an async function in the thunk
        dispatch(startGoogleSignIn());
    }

  return (
    <AuthLayout title="Login">
      {/* children para el AuthLayout*/}
      <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
          <Grid container>
            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Correo" 
                type="email"
                placeholder="example@email.com"
                fullWidth
                name="email"
                value={ email }
                onChange={onInputChange}
                />
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Contraseña" 
                type="password"
                placeholder="contraseña"
                fullWidth
                name="password"
                value={ password }
                onChange={onInputChange}/>
            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt:1}}>
              <Grid item xs={ 12 } display={ !!errorMessage ? '' : 'none'}>
                <Alert severity="error">{errorMessage}</Alert>
              </Grid>

              <Grid item xs={ 12 } sm={ 6 }>
                <Button 
                    variant='contained' 
                    fullWidth 
                    type="submit" 
                    disabled={isAuthenticating}>
                  Login
                </Button>
              </Grid>

              <Grid item xs={ 12 } sm={ 6 }>
                <Button variant='contained' fullWidth onClick={onGoogleSignIn} disabled={isAuthenticating}>
                  <Google/>
                  <Typography sx={{ml:1}}>Google</Typography>
                </Button>
              </Grid>
            </Grid>

            <Grid container direction='row' justifyContent='end'>
              <Link component={RouterLink} color='inherit' to='/auth/register'>
                Crear una cuenta
              </Link>
            </Grid>

          </Grid>
      </form>
    </AuthLayout>
  )
}
