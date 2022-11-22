import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext({});

export function AppProvider({ children }) {
    const [loading, setLoading] = useState(null)
    const [alert, setAlert] = useState()

    const startLoading = async (loading = { msg: 'Carregando...' }) => {
        setLoading(loading)
        return
    }

    const stopLoading = async () => {
        setLoading(null)
        return
    }

    return (
        <AppContext.Provider value={{loading, stopLoading, startLoading, alert, setAlert}}>
            {children}
        </AppContext.Provider>
    )

};