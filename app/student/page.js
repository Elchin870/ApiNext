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

    return (
        <div style={{ padding: 20 }}>
            {
                students && <ul>
                    {
                        students.map((s) => (
                            <li key={s.id}>
                                <strong>{s.name} - {s.surname}</strong>
                            </li>
                        ))
                    }
                </ul>
            }

            <AddStudent />

        </div>
    )
}