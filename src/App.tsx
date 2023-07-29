import { useEffect, useState } from 'react'
import './App.css'
import API from '../../API'


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
     
    </>
  )
}

export default App
