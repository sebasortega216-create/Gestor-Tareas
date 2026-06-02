import { FaTasks } from "react-icons/fa"
import './HeaderApp.css'

export const HeaderApp = () => {
    return(
        <>
        <header className="header-app">
           <FaTasks />
           <h1>Gestor de Tareas</h1>
       </header>    
       <hr />        
        </>
    )
}