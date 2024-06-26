import { IconButton } from "@mui/material"
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView } from "../views/NoteView"
import { NothingSelectedView } from "../views/NothingSelectedView"
import { AddOutlined } from "@mui/icons-material"
import { useDispatch, useSelector } from "react-redux"
import { startNewNote } from "../../store/journal"

/*Typography is necesary to implement the font of mui
variant permite definir el tipo de tag que sera el Typography h1 p h2 etc
*/
export const JournalPage = () => {

    const dispatch = useDispatch();

    const {isSaving, active} = useSelector(state => state.journal);

    const onClickNewNote = () => {
        dispatch(startNewNote());
    };

  return (
    <JournalLayout>

      {/* transforms the object into a boolean */}
      {(!!active) ? <NoteView />:<NothingSelectedView/>}

      <IconButton
       disabled={ isSaving }
       onClick={ onClickNewNote }
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
