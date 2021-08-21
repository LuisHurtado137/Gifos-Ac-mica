import React, { useEffect, useState } from "react";

export const AppContext = React.createContext({});

const initialState = {
    gifs: [],
    isLoading: false,
    error: false,
    loadedGifs: false
}

export default function AppContextProvider(props){

//Estados iniciales//

    const [state, setState] = useState(initialState)
    const [gifs, setGifs] = useState(initialState.gifs)
    const [error, setError] = useState(initialState.error)
    const [isLoading, setIsLoading] = useState(initialState.isLoading)
    const [query, setQuery] = useState("")
    const [numberGifsLoaded, setNumberGifsLoades] = useState(0);



//Fetch a la API//
    const searchGifs = (query) => {
        setIsLoading(true)
        fetch(`https://api.giphy.com/v1/gifs/search?api_key=RuNm5Y0TXMMsxF2tVWEYVkzGcuITomlk&q=${query}&limit=12`)
        .then(response => {
            if(!response.ok){
                setError(true);
                setIsLoading(false)
            }
            return response.json()
            
        })
        .then(response => {
            if(query.length === 0){
                setError(false)
                setIsLoading(false)
                setGifs([])
            } else if(query.length > 0 && response.data.length === 0){
                setError(true)
                setIsLoading(false)
            } else {
                setGifs(response.data)
                setIsLoading(false)
                setState((prevState) => ({...prevState, loadedGifs: false}))
            }
        })
        .catch(err => {
            setError(true)
            setIsLoading(false)
        })
    }

    const handlerGifLoades = (number) => {
        setNumberGifsLoades(number);
    }

    const handlerQuery = (q) =>{
        setQuery(q)
    }

    useEffect(() =>{
        setState((prevState) => ({...prevState, isLoading}))
    }, [isLoading])

    useEffect(() =>{
        setState((prevState) => ({...prevState, error}))  
    }, [error])

    useEffect(() =>{
        setState((prevState) => ({...prevState, gifs}))  
    }, [gifs])

    useEffect(() =>{
        searchGifs(query)  
    }, [query])

    
    useEffect(() => {
        if(numberGifsLoaded === 11){
            setState((prevState) => ({...prevState, loadedGifs: true}));
            setNumberGifsLoades(0);
        }       
    }, [numberGifsLoaded]);

    return(
        <AppContext.Provider value={{state, setState, handlerQuery, handlerGifLoades}}>
            {props.children}
        </AppContext.Provider>
    )
}

