import { useEffect } from 'react';

import './App.css';

import Tasks from './components/Tasks/Tasks'
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'

import useStore from './store/useStore'

function App() {

  useEffect(() => {

    useStore.getState().historyDateManager()

  }, [])


  return (
    <div className="d--grid container app">
      {/* header */}
      <div className="app__header">
        <Header />
      </div>
      {/* sidebar */}
      <div className="app__sidebar">
        <Sidebar />


      </div>
      {/* main content */}
      <div className="app__main">
        <Tasks />
      </div>

    </div>
  )
}

export default App
