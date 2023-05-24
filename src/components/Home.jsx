import {useEffect} from 'react'
import Navbar from '../components/globals/Navbar'
import Menu from '../components/Menu'
import { getCandidates } from '../services'

const Home = () => {

  useEffect(()=> {
    getCandidates()
  },[])

  return (
    <>
      <Navbar/>
      <Menu/>
    </>
  )
}

export default Home