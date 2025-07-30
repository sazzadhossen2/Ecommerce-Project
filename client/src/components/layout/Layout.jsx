import React from 'react'

import Footer from './Footer'
import NavBar from '../layout/NavBar'


function Layout({children}) {
  return (
    <>
   
   <NavBar/>
{children}
   <Footer/>
    
    </>
  )
}

export default Layout