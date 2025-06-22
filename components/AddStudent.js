'use client'

import { useState } from "react"

export default function AddStudent() {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [age, setAge] = useState(0);
    const [message, setMessage] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const res = await fetch(`/api/students`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, surname, age })
        })

        const data = await res.json();
        setMessage(data.message);
    }

    return (
        <div style={{ padding: 20 }}>
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                <input placeholder="Surname" value={surname} onChange={(e) => setSurname(e.target.value)} />
                <input placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} />
                <button type="submit">Add new Student</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    )

}