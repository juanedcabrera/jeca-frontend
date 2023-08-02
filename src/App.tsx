import { useEffect, useState } from 'react'
import './App.css'
import API from '../../API'
import Kanbanboard from './components/Kanbanboard'

function App() {
  const [data, setData] = useState([])

  const getData = async () => {
    const {data} = await API.get('http://localhost:8000/api/jobs/');
    setData(data)
  }

  useEffect(() => {
    getData();
  }, [])

  console.log(data)

  return (
    <>
      <Kanbanboard />
      
     
    </>
  )
}

export default App
