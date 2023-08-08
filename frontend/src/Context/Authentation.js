import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export const Mycontext = createContext();

const Context = ({ children }) => {
    const navigate = useNavigate();
    const [user, setuser] = useState([]);

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        setuser(userInfo);
        if (!userInfo) {
            navigate("/")
        }
    }, [navigate])

    const value = { user, setuser };

    return (
        <Mycontext.Provider value={value}>
            {children}
        </Mycontext.Provider>
    )

}

const useGlobalContext = () => {
    return useContext(Mycontext);
}

export default Context
export { useGlobalContext }


