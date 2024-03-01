import React from "react";

const userAPI = async () => {
    try {
        const res = await fetch('http://localhost:3000/user');
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
    }
}


export default userAPI;