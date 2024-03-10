import { Link as RouterLink } from "react-router-dom" // adds the new name to prevents conflicts
import { Google } from "@mui/icons-material"
import { Button, Grid, Link, TextField, Typography } from "@mui/material"
import { AuthLayout } from "../layout/AuthLayout"

/*sx hace referencia style extended, permite trabajar con la propiedad style y accede al tema 
xs hace referencia a tamaño de pantallas pequeñas, medianas grandes y xxl

variant permite definir el tipo de tag que sera el Typography h1 p h2 etc
*/

export const RegisterPage = () => {
  return (
    <AuthLayout title="Crear cuenta">
      <form>
          <Grid container>

          <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Nombre completo" 
                type="text"
                placeholder="Jhon Doe"
                fullWidth/>
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Correo" 
                type="email"
                placeholder="example@email.com"
                fullWidth/>
            </Grid>

            <Grid item xs={12} sx={{mt:2}}>
              <TextField 
                label="Contraseña" 
                type="password"
                placeholder="contraseña"
                fullWidth/>
            </Grid>

            <Grid container spacing={2} sx={{mb:2, mt:1}}>
              <Grid item xs={ 12 }>
                <Button variant='contained' fullWidth>
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
