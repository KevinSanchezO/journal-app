import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoutes } from "../auth/routes/AuthRoutes";
import { JournalRoutes } from "../journal/routes/JournalRoutes";
import { CheckingAuth } from "../ui";
import { useCheckAuth } from "../hooks";

export const AppRouter = () => {
    const status = useCheckAuth();

    if (status === 'checking') {
        return <CheckingAuth />
    }
  
  return (
    <Routes>

        {/**
         * if the user is aunthenticated then it will show the routes related to the content
         * of the page, if the user isn't then the views related to login and register are loaded
         */}
        {
            (status === 'authenticated') 
            ? <Route path="/*" element={<JournalRoutes/>}/> 
            : <Route path="/auth/*" element={<AuthRoutes/>}/>
        }

        <Route path='/*' element={<Navigate to='/auth/'/>}/>

    </Routes>
  )
}
