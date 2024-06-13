import { TurnedInNot } from "@mui/icons-material"
import { Box, Drawer, Toolbar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, Grid, ListItemText } from "@mui/material"
import { useSelector } from "react-redux";

const values = ['Enero','Febrero','Marzo','Abril'];

export const SideBar = ( {drawerWidth} ) => {

    const {displayName} = useSelector(state => state.auth);

  return (
    <Box
        component='nav'
        sx={{width: {sm:drawerWidth}, flexShrink:{sm:0} }}
    >
        <Drawer
            variant='permanent'  //temporary
            open={true}
            sx={{
                display:{xs:'block'},
                '& .MuiDrawer-paper': {boxSizing:'border-box', width:drawerWidth}
            }}
        >
            <Toolbar>
                <Typography variant='h6' noWrap component='div'>
                    {displayName}
                </Typography>
            </Toolbar>
            <Divider/>

            <List>
                {
                    values.map( text => (
                        <ListItem key={text} disablePadding>
                            <ListItemButton>
                                <ListItemIcon>
                                    <TurnedInNot />
                                </ListItemIcon>
                                <Grid container>
                                    <ListItemText primary={text}/>
                                    <ListItemText secondary={'Ad amet proident labore qui nisi eu anim enim.'}/>
                                </Grid>
                            </ListItemButton>
                        </ListItem>
                    ))
                }
            </List>

        </Drawer>

    </Box>
  )
}
