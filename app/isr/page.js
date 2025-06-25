'use client'

import { useEffect, useState } from "react";

export default function Home() {
    const [user, setUser] = useState(null);

    async function fetchUser() {
        try {
            const res = await fetch("https://randomuser.me/api");
            const data = await res.json();
            setUser(data.results[0]);
        } catch (error) {
            console.error("User fetch error:", error);
        }
    }

    useEffect(() => {
        fetchUser();


        const intervalId = setInterval(fetchUser, 15000);

        return () => clearInterval(intervalId);
    }, []);

    if (!user) return <p>Loading...</p>;

    return (
        <div style={{ textAlign: "center", marginTop: 40 }}>
            <h2>
                {user.name.first} {user.name.last}
            </h2>
            <img src={user.picture.large} alt="User" style={{ borderRadius: "50%" }} />
            <p>Email: {user.email}</p>
            <p>Location: {user.location.city}, {user.location.country}</p>
        </div>
    );
}
