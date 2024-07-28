import React from 'react'
import PersistentDrawerLeft from '../../components/PersistentDrawerLeft'
import useAuthRedirect from '../../hooks/CheckAuth';

function Discussion() {
    useAuthRedirect()
    return (
        <>
            <PersistentDrawerLeft />
            <div>Discussion</div>
        </>
    )
}

export default Discussion