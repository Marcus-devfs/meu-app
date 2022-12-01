import React, { createContext, useContext, useState } from "react";

export const AppContext = createContext();

export function AppProvider({ children }) {
    
    const [loading, setLoading] = useState(null)
    const [alert, setAlert] = useState()

    const startLoading = async (  loading = 'Carregando...' ) => {
        setLoading(loading)
        return
    }

    const stopLoading = async () => {
        setLoading(false)
        return
    }

    return (
        <AppContext.Provider value={{loading, stopLoading, startLoading, alert, setAlert}}>
            {children}
        </AppContext.Provider>
    )

};