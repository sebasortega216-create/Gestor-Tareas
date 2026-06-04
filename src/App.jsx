import { HeaderApp } from './components/HeaderApp/HeaderApp'
import { InputTask } from './components/InputTask/InputTask'
import { ListTasks } from './components/ListTasks/ListTasks'


export const App = () => {
  return (
    <>
      <HeaderApp />
      <InputTask />
      <ListTasks />
    </>
   
  )
}