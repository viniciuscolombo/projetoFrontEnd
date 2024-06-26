import React, { useState, useEffect } from 'react';
import './UserTable.css';

const UserTable = () => {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState({ id: null, name: '', email: '', phone: '', address: '', password: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/users');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.error('Falha ao buscar usuários');
            }
        } catch (error) {
            console.error('Erro ao processar requisição:', error);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isEditing) {
            fetch(`http://localhost:3000/users/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            }).then(response => response.json())
              .then(updatedUser => {
                  setUsers(users.map(user => user.id === formData.id ? updatedUser : user));
                  setIsEditing(false);
                  setFormData({ id: null, name: '', email: '', phone: '', address: '', password: '' });
              });
        } else {
            const { id, ...dataWithoutId } = formData; 
            fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataWithoutId),
            })
            .then(response => response.json())
            .then(data => {
                setUsers([...users, data]);
                setFormData({ id: null, name: '', email: '', phone: '', address: '', password: '' });
            });
        }
    };

    const handleEdit = (user) => {
        setFormData(user);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/users/${id}`, { method: 'DELETE' })
        .then(() => setUsers(users.filter(user => user.id !== id)));
    };

    return (
        <div className="user-container">
            <h2>Usuários</h2>
            <form className="user-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nome" value={formData.name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="text" name="phone" placeholder="Telefone" value={formData.phone} onChange={handleChange} required />
                <input type="text" name="address" placeholder="Endereço" value={formData.address} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Senha" value={formData.password} onChange={handleChange} required />
                <button type="submit">{isEditing ? 'Editar' : 'Adicionar'} Usuário</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Telefone</th>
                        <th>Endereço</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.phone}</td>
                            <td>{user.address}</td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Editar</button>
                                <button onClick={() => handleDelete(user.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserTable;
