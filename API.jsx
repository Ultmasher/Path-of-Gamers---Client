import React from 'react'

const API = () => {



    const getLoLData = async () => {
        try {
            const res = await fetch("http://localhost:8000/getinfo")
            const data = await res.json();
            return data;

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const getUserData = async (id) => {
        try {
            const res = await fetch(`http://localhost:8000/user/${id}`)
            const data = await res.json();
            return data;

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }


    const modifyUser = async (userData) => {
        try {
            const res = await fetch("http://localhost:8000/user/65dc65e3c92b7f3839eb1565", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            });
            const data = await res.json();
            return data;
        } catch (error) {
            console.log(error);
        }
    };









    return { getLoLData, getUserData, modifyUser };
}
export default API;