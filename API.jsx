import React from 'react'

export const API = () => {
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
    const registerUser = async (userData) => {
        try {
            const res = await fetch("http://localhost:8000/user", {
                method: "POST",
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

    const modifyAvatar = async (file) => {
        const formData = new FormData();
        formData.append('profile-picture', file);

        const response = await fetch('http://localhost:8000/user/avatar/65dc65e3c92b7f3839eb1565', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error('Error uploading profile picture');
        }
    };

    function getGame(req, res) {
        const { id } = req.params;
        try {
            const data = await Games.findById(id)
            if (!data) {
                return res.status(404).json({ message: "Game not found" });
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
            res.sendStatus(500)
        }
    }

    return { getLoLData, getUserData, modifyUser, modifyAvatar, registerUser , getGame };
};

export default API;