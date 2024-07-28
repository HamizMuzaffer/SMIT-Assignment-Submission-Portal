import React from 'react'
import useAuthRedirect from '../../hooks/CheckAuth';

function Teacher()

 {
    useAuthRedirect()

  return (
    <div>Teacher</div>
  )
}

export default Teacher