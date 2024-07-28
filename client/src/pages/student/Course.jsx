import React from 'react'
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft'
import useAuthRedirect from '../../hooks/CheckAuth';

function Course() {
    useAuthRedirect()

  return (
    <>
    <PersistentDrawerLeft />
    <div>Course</div>
    </>
  )
}

export default Course