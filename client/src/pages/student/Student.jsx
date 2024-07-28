import React from 'react'
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft'
import useAuthRedirect from '../../hooks/CheckAuth';

function Student() {
  useAuthRedirect()

  return (
<>
<PersistentDrawerLeft />
<div>Hello</div>
</>

)
}

export default Student