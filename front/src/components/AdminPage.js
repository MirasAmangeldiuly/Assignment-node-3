// AdminPage.js

import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';

// Styled components
const Container = styled.div`
  padding: 20px;
`;

const UserList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const UserItem = styled.li`
  margin-bottom: 10px;
`;

const AddUserForm = styled.form`
  margin-top: 20px;
`;

const AddUserInput = styled.input`
  padding: 8px;
  margin-right: 10px;
`;

const AddUserButton = styled.button`
  padding: 8px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 200px;
`;

const LogoutButton = styled.button`
  padding: 8px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
  width: 200px;
`;

const DeleteUserButton = styled.button`
  padding: 8px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 200px;
`;

const AdminPage = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const [cookies] = useCookies(['token']);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/getAll',
                {
                    headers : {
                        Authorization: `${cookies.token}`
                    }
                });
            const data = await response.json();
            if (data.success) {
                setUsers(data.data);
            } else {
                console.error('Failed to fetch users:', data.message);
                navigate('/login');
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/user/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${cookies.token}`
                },
                body: JSON.stringify({ name: username, email: password }),
            });
            if (response.ok) {
                fetchUsers(); // Refresh user list
                setUsername('');
                setPassword('');
            } else {
                console.error('Failed to add user:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding user:', error);
        }
    };

    const handleLogout = () => {
        cookies.token = '';
        navigate('/login');
    };

    const handleDeleteUser = async (userId) => {
        try {
            const response = await fetch(`http://localhost:3000/user/delete/${userId}`, {
                method: 'DELETE',
                headers: {
                    Authorization: `${cookies.token}`
                },
            });
            const data = await response.json();
            if (data.success) {
                fetchUsers(); // Refresh user list
            } else {
                console.error('Failed to delete user:', response.statusText);
                navigate('/login')
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    return (
        <Container>
            <h2>User List</h2>
            <UserList>
                {users.map((user) => (
                    <UserItem key={user._id}>
                        {user.username} - {user.password}
                        <DeleteUserButton onClick={() => handleDeleteUser(user._id)}>
                            Delete
                        </DeleteUserButton>
                    </UserItem>
                ))}
            </UserList>
            <AddUserForm onSubmit={handleSubmit}>
                <AddUserInput
                    type="text"
                    placeholder="Name"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <AddUserInput
                    type="email"
                    placeholder="Email"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <AddUserButton type="submit">Add User</AddUserButton>
            </AddUserForm>
            <LogoutButton onClick={handleLogout}>Logout</LogoutButton>
        </Container>
    );
};

export default AdminPage;
