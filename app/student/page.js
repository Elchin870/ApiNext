'use client'

import AddStudent from "@/components/AddStudent";
import { useEffect, useState } from "react"

export default function StudentList() {
    const [students, setStudents] = useState(null);

    async function fetchStudents() {
        await fetch(`/api/students`)
            .then(res => res.json())
            .then(data => setStudents(data));
    }

    useEffect(() => {
        fetchStudents();
    }, []);

    if (!students) return <p>Loading ...</p>

    async function handleDelete(id) {
        const res = await fetch(`/api/students/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            setStudents(prev => prev.filter(s => s.id !== id));
        }
        else {
            const error = await res.json();
            alert(error.error || "Failed to delete student");
        }
    }

    return (
        <div style={{ padding: 20 }}>
            {
                students && <ul>
                    {
                        students.map((s) => (
                            <li key={s.id}>
                                <strong>{s.name} - {s.surname}</strong>
                                <button style={{ backgroundColor: 'red', marginLeft: 10 }} onClick={() => handleDelete(s.id)} >Delete</button>
                            </li>
                        ))
                    }
                </ul>
            }

            <AddStudent />

        </div>
    )
}