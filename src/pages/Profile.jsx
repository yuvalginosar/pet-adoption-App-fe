import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import './Profile.css'

function Profile(props) {
    const { activeUser, editUser } = useAuth();

    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [userBio, setUserBio] = useState('')

    function handleNewDetails(){
        const userDetails = {}
        if (firstName.length > 0) userDetails['first_name'] = firstName
        if (lastName.length > 0) userDetails['last_name'] = lastName
        if (email.length > 0) userDetails['email'] = email
        if (pwd.length > 0) userDetails['password'] = pwd
        if (phoneNumber.length > 0) userDetails['phone'] = phoneNumber
        if (userBio.length > 0) userDetails['bio'] = userBio

        editUser(userDetails)
    }
    return (
        <div className='p-profile'>
            <h3 className='mb-4'>Edit your profile</h3>
             <Form>
                    <Form.Group className="mb-3" >
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Family Name</Form.Label>
                        <Form.Control type="text" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" >
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" 
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Label>Tell us a little bit about yourself</Form.Label>
                    <FloatingLabel className='form-control' controlId="floatingTextarea2" >
                        <Form.Control
                        as="textarea"
                        placeholder="..."
                        style={{ height: '100px' }}
                        className='textarea'
                        onChange={(e) => setUserBio(e.target.value)}
                        />
                    </FloatingLabel>
                    <Button
                        className=' btn my-3'
                        variant="primary" 
                        type="button"
                        onClick={handleNewDetails}>
                        Save Changes
                    </Button>
                </Form>
        </div>
    );
}

export default Profile;