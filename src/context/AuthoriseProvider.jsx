import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



export const AuthoriseProvider = ({ children }) => {
    const navigate = useNavigate();
    

    useEffect(() => {
    const test= localStorage.getItem("jwt") 
        if (!test) {
            navigate("/login");
        }
    }, []);

    return  children   

};

export default AuthoriseProvider;


