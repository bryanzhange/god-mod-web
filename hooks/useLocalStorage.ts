import {useState, useEffect} from 'react';

const useLocalStorage = (key: string, initialState: any = null) => {
    const [value, setValue] = useState(() => {
        try {
            const storedValue = localStorage?.getItem(key) || initialState;
            if (storedValue !== null)
                return JSON.parse(storedValue)
            return storedValue;
        }
        catch(err) {
            return initialState;
        }
    });
    useEffect(() => {
        if(localStorage) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            }
            catch(e) {}
        }
    }, [value]);
    return [value, setValue];
}

export default useLocalStorage;
