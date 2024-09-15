import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css'

const Profile = () => {
    const [user, setUser] = useState({
        name: '',
        nickname: '',
        photo: '',
        joinDate: '',
        surname: '',
        categories: '',
        description: '',
        birthDate: '',
        email: '',
        socialLinks: '',
        newPassword: '',
        repeatNewPassword: ''
    });

    // Fetch endpoint http://localhost:3001/user/1 
    useEffect(() => {
        axios.get("http://localhost:3001/user/1") 
            .then(response => setUser(response.data))
            .catch(error => console.error('Error fetching user profile:', error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSaveChanges = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/user/1", user) 
            .then(response => alert('Profile updated successfully!'))
            .catch(error => alert('Error updating profile:', error));
    };

    return (
        <div className="profile-container">
            <div className="profile-content">
                <div className="profile-left">
                    <img src={user.photo} alt="Profile" className="profile-photo" />
                    <h2>{user.name}</h2>
                    <p>@{user.nickname}</p>
                    <button>Actualizar Foto</button>
                    <p>Miembro desde {user.joinDate}</p>
                </div>
                <div className="profile-right">
                    <h1>Editar Perfil</h1>
                    <h2>Información de Usuario</h2>
                    <form onSubmit={handleSaveChanges}>
                        <label>
                            Nombre
                            <input type="text" name="name" value={user.name} onChange={handleInputChange} />
                        </label>
                        <label>
                            Apellido
                            <input type="text" name="surname" value={user.surname} onChange={handleInputChange} />
                        </label>
                        <label>
                            Categorías
                            <input type="text" name="categories" value={user.categories} onChange={handleInputChange} />
                        </label>
                        <label>
                            Descripción
                            <textarea name="description" value={user.description} onChange={handleInputChange} />
                        </label>
                        <label>
                            Fecha de Nacimiento
                            <input type="date" name="birthDate" value={user.birthDate} onChange={handleInputChange} />
                        </label>
                        <label>
                            Email
                            <input type="email" name="email" value={user.email} onChange={handleInputChange} />
                        </label>
                        <label>
                            Redes Sociales
                            <input type="text" name="socialLinks" value={user.socialLinks} onChange={handleInputChange} />
                        </label>
                        <label>
                            Nueva Contraseña
                            <input type="password" name="newPassword" value={user.newPassword} onChange={handleInputChange} />
                        </label>
                        <label>
                            Repetir Nueva Contraseña
                            <input type="password" name="repeatNewPassword" value={user.repeatNewPassword} onChange={handleInputChange} />
                        </label>
                        <button type="submit">Guardar Cambios</button>
                    </form>
                </div>
            </div>
        </div>
    );
    
};

export default Profile;