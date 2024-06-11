import { useDispatch } from "react-redux"
import { Link as RouterLink } from "react-router-dom" // adds the new name to prevents conflicts
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { Google } from "@mui/icons-material"

import { AuthLayout } from "../layout/AuthLayout"
import { useForm } from "../../hooks"
import { checkingAuthentication, startGoogleSignIn } from "../../store/auth"

/*sx hace referencia style extended, permite trabajar con la propiedad style y accede al tema 
xs hace referencia a tamaño de pantallas pequeñas, medianas grandes y xxl

variant permite definir el tipo de tag que sera el Typography h1 p h2 etc
*/

export const LoginPage = () => {

    // gives access to the reducers or async functions that access the reducers
    const dispatch = useDispatch();

    const { email, password, onInputChange, formState } = useForm({
        email: "kevin@google.com",
        password: "123456"
    })

    const onSubmit = (event) => {
        event.preventDefault();

        console.log({email, password});

        //calls an async function in the thunk
        dispatch(checkingAuthentication);
    }

    const onGoogleSignIn = () => {
        console.log("On Google signin")

        //calls an async function in the thunk
        dispatch(startGoogleSignIn());
    }

  return (
    <AuthLayout title="Login">
      {/* children para el AuthLayout*/}
      <form onSubmit={onSubmit}>
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
              <Grid item xs={ 12 } sm={ 6 }>
                <Button variant='contained' fullWidth type="submit">
                  Login
                </Button>
              </Grid>

              <Grid item xs={ 12 } sm={ 6 }>
                <Button variant='contained' fullWidth onClick={onGoogleSignIn}>
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
