import { Box, Drawer, Toolbar, Typography, Divider, List, ListItem } from "@mui/material"
import { useSelector } from "react-redux";
import { SidebarItem } from "./SidebarItem";

const values = ['Enero','Febrero','Marzo','Abril'];

export const SideBar = ( {drawerWidth} ) => {
    const {displayName} = useSelector(state => state.auth);
    const {notes} = useSelector(state => state.journal);

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
                    notes.map( note => (
                        <SidebarItem key={note.id} note={ note }/>
                    ))
                }
            </List>

        </Drawer>

    </Box>
  )
}
