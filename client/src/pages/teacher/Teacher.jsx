import React from 'react'
import useAuthRedirect from '../../hooks/CheckAuth';
import MiniDrawer from '../../components/Drawer';
function Teacher()

 {
    useAuthRedirect()

  return (
    <MiniDrawer />
  )
}

export default Teacher