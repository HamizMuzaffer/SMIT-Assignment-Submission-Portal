import React from 'react'
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft'
import useAuthRedirect from '../../hooks/CheckAuth';

function Assignments() {
    useAuthRedirect()

  return (
    <>   <PersistentDrawerLeft />
    <div>Assignments</div>
    </>
 
  )
}

export default Assignments