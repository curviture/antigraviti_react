import './App.css';

import Tasks from './components/Tasks/Tasks'
import Header from './components/Header/Header'

function App() {
  return (
    <div className="d--grid container app">
      {/* header */}
      <div className="app__header">
        <Header />
      </div>
      {/* sidebar */}
      <div className="app__sidebar">
        <h2>SideBar</h2>


      </div>
      {/* main content */}
      <div className="app__main">
        <Tasks />
      </div>

    </div>
  )
}

export default App
