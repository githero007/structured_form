import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/LogIn'
import FormBuilder from './components/FormBuilder'
import FormRender from './components/FormRender'


function App() {


  return (
    <>
      <FormBuilder></FormBuilder>
      <FormRender />
    </>
  )
}

export default App
