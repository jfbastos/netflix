import React, { useState } from 'react'

export const ProfileContext = React.createContext({});

export const ProfileProvider = props => {
    const [user, setUser] = useState(null)
    return (
        <ProfileContext.Provider value={{ user, setUser }}>
            {props.children}
        </ProfileContext.Provider>
    )
}