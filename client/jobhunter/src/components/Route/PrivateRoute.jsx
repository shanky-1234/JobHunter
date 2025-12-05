import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router'

export const PrivateRoute = ({children}) => {
    const {user} = useSelector(store=>store.auth)
  return (
   
        user ? children : <Navigate to='/' replace />

  )
}

export const PublicRoute = ({children}) =>{
    const {user} = useSelector(state=>state.auth)
    return(
        !user ? children : <Navigate to={'/'} replace />
    )
}


