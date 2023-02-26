import React from 'react'
import { useSelector } from 'react-redux'
import { Route, useNavigate } from 'react-router-dom'

const ProtectedRoute = ({component: Component, ...rest}) => {

  const {loading, isAuthenticated, user} = useSelector(state=>state.user)

  const navigate = useNavigate()
  return (
    <>
      {!loading && (
        <Route {...rest} render={(props) => {
          if(!isAuthenticated){
            navigate('/login');
          }
          return <Component {...props} />;
        }} />
      )}
    </>
  )
}

export default ProtectedRoute
