import { FaTasks } from "react-icons/fa"
import './HeaderApp.css'

export const HeaderApp = () => {
    return(
        <>
        <FaTasks />
        <header className="header-app">
           <h1>Gestor de Tareas</h1>
       </header>    
       <hr />        
        </>
    )
}