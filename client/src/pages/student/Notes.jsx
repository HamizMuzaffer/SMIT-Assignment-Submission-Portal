import React from 'react'
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft'
import useAuthRedirect from '../../hooks/CheckAuth';

function Notes() {
    useAuthRedirect()

    return (
        <>
            <PersistentDrawerLeft />
            <div>Discussion</div>

        </>)
}

export default Notes