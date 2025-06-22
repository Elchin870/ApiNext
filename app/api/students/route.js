const mockStudents = [
    { id: 1, name: 'Elchin', surname: 'Aliyev', age: 19 },
    { id: 2, name: 'Vugar', surname: 'Hasanli', age: 20 },
    { id: 3, name: 'Revan', surname: 'Guliyev', age: 21 }
];

export async function GET() {
    return Response.json(mockStudents);
}

export async function POST(request) {
    const body = await request.json();
    const newStudent = {
        id: mockStudents.length + 1,
        name: body.name,
        surname: body.surname,
        age: body.age
    };

    mockStudents.push(newStudent);

    return Response.json({ message: 'Student added successfully', product: newStudent }, { status: 201 });
}