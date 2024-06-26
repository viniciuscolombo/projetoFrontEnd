import React, { useState, useEffect } from 'react';
import './ServiceTable.css';

const ServiceTable = () => {
    const [services, setServices] = useState([]);
    const [formData, setFormData] = useState({ id: null, name: '', description: '', price: '', duration: '', category: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const response = await fetch('http://localhost:3000/services');
            if (response.ok) {
                const data = await response.json();
                setServices(data);
            } else {
                console.error('Falha ao buscar serviços');
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
            fetch(`http://localhost:3000/services/${formData.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            }).then(response => response.json())
              .then(updatedService => {
                  setServices(services.map(service => service.id === formData.id ? updatedService : service));
                  setIsEditing(false);
                  setFormData({ id: null, name: '', description: '', price: '', duration: '', category: '' });
              });
        } else {
            const { id, ...dataWithoutId } = formData; 
            fetch('http://localhost:3000/services', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataWithoutId),
            })
            .then(response => response.json())
            .then(data => {
                setServices([...services, data]);
                setFormData({ id: null, name: '', description: '', price: '', duration: '', category: '' });
            });
        }
    };

    const handleEdit = (service) => {
        setFormData(service);
        setIsEditing(true);
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:3000/services/${id}`, { method: 'DELETE' })
        .then(() => setServices(services.filter(service => service.id !== id)));
    };

    return (
        <div className="service-container">
            <h2>Serviços</h2>
            <form className="service-form" onSubmit={handleSubmit}>
                <input type="text" name="name" placeholder="Nome" value={formData.name} onChange={handleChange} required />
                <input type="text" name="description" placeholder="Descrição" value={formData.description} onChange={handleChange} required />
                <input type="number" name="price" placeholder="Preço" value={formData.price} onChange={handleChange} required />
                <input type="text" name="duration" placeholder="Duração" value={formData.duration} onChange={handleChange} required />
                <input type="text" name="category" placeholder="Categoria" value={formData.category} onChange={handleChange} required />
                <button type="submit">{isEditing ? 'Editar' : 'Adicionar'} Serviço</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Duração</th>
                        <th>Categoria</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map(service => (
                        <tr key={service.id}>
                            <td>{service.id}</td>
                            <td>{service.name}</td>
                            <td>{service.description}</td>
                            <td>{service.price}</td>
                            <td>{service.duration}</td>
                            <td>{service.category}</td>
                            <td>
                                <button onClick={() => handleEdit(service)}>Editar</button>
                                <button onClick={() => handleDelete(service.id)}>Deletar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ServiceTable;
