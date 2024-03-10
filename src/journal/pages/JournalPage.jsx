import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView } from "../views/NoteView"
import { NothingSelectedView } from "../views/NothingSelectedView"
import { AddOutlined } from "@mui/icons-material"

/*Typography is necesary to implement the font of mui
variant permite definir el tipo de tag que sera el Typography h1 p h2 etc
*/
export const JournalPage = () => {
  return (
    <JournalLayout>

      {/*<NothingSelectedView/>*/}

      <NoteView />

      <IconButton
       size='large'
       sx={{
        color:'white',
        backgroundColor: 'error.main',
        ':hover': {backgroundColor: 'error.main', opacity:0.9},
        position: 'fixed',
        right: 50,
        bottom: 50
       }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>

    </JournalLayout>
  )
}
