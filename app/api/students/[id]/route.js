const mockStudents = [
    { id: 1, name: 'Elchin', surname: 'Aliyev', age: 19 },
    { id: 2, name: 'Vugar', surname: 'Hasanli', age: 20 },
    { id: 3, name: 'Revan', surname: 'Guliyev', age: 21 }
];

export async function DELETE(request, { params }) {
    const id = parseInt(params.id);
    const student = mockStudents.findIndex(s => s.id === id);
    if (student === -1) {
        return new Response(JSON.stringify({ error: 'Student did not find' }, { status: 404 }));
    }

    mockStudents.splice(student, 1);

    return new Response(
        JSON.stringify({ message: 'Student deleted successfully' }),
        { status: 200 }
    );
}

export async function PUT(request, { params }) {
    const id = parseInt(params.id);
    const index = mockStudents.findIndex(s => s.id === id);

    if (index === -1) {
        return new Response(
            JSON.stringify({ error: 'Student not found' }),
            { status: 404 }
        );
    }

    const body = await request.json();
    const { name, surname, age } = body;

    mockStudents[index] = { ...mockStudents[index], name, surname, age };

    return new Response(
        JSON.stringify({ message: 'Student updated successfully', student: mockStudents[index] }),
        { status: 200 }
    );
}