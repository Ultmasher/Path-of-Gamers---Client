import axios from "axios";
import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const navigate = useNavigate();
    const [token, setToken] = useState(localStorage.getItem("jwt") || null);
    const [user, setUser] = useState({});
    const [games, setGames] = useState([])

    const login = async (formData, setLoading, setError) => {
        setLoading(true);
        try {
            const response = await axios.post("http://localhost:8000/user/login", formData, { headers: { 'Content-Type': 'application/json' } })
            const { token, user } = response.data;
            localStorage.setItem("jwt", token)
            setToken(token);
            setUser(user);

            setTimeout(() => {
                navigate("/")
            }, 1000)

        } catch (e) {
            console.log(e)
            setError(e.response.data)
            setTimeout(() => {
                setError(null)
            }, 3000)
        } finally {
            setLoading(false);
        }
    }

    const loginDiscord = async (setLoading, setError) => {
        setLoading(true);
        try {
            const response = await axios.get("http://localhost:8000/user/login/discord", { headers: { 'Content-Type': 'application/json' } })
            console.log(response, 'response')
            // const { token, user } = response.data;
            // localStorage.setItem("jwt", token)
            // setToken(token);
            // setUser(user);

            // setTimeout(() => {
            //     navigate("/")
            // }, 2000)

        } catch (e) {
            console.log(e)
            setError(e.response.data)
            setTimeout(() => {
                setError(null)
            }, 3000)
        } finally {
            setLoading(false);
        }
    }

    const logout = () => {
        localStorage.removeItem("jwt");
        setToken(null)
        setUser(null)
        navigate("/login")
    }

    useEffect(() => {
        const fetchUser = async () => {
            console.log(token, 'authcontext')

            if (token) {
                try {
                    const response = await axios.get("http://localhost:8000/user/user", {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setUser(response.data);

                } catch (e) {
                    console.log(e)
                    logout();

                }
            }


        }


        const fetchGames = async () => {

            try {
                const response = await axios.get("http://localhost:8000/games/", {
                    headers: {
                        'Content-Type': 'application/json'

                    }
                });
                setGames(response.data);

            } catch (e) {
                console.log(e)
                logout();

            }



        }
        fetchUser();
        fetchGames();
    }, [token])

    return (

        <AuthContext.Provider value={{ user, token, login, logout, loginDiscord, setUser, setToken, games }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);