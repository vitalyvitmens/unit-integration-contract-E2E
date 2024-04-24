import { Provider } from 'react-redux'
import { store } from './store/configureStore'
import { NewTaskBar } from './modules/NewTaskBar'
import { TaskList } from './modules/TaskList'
import { NotifierContainer } from './modules/NotifierContainer'
import './styles.css'

export const App = () => {
  return (
    <div className="root-container">
      <Provider store={store}>
        <h3>Список задач</h3>
        <NewTaskBar />
        <TaskList />
        <NotifierContainer />
      </Provider>
    </div>
  )
}
