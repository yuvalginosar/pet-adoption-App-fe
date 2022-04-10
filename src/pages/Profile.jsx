import React, { useState } from 'react';
import { Button, FloatingLabel, Form } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
import './Profile.css'

function Profile(props) {
    const { activeUser, editUser } = useAuth();

    const [email, setEmail] = useState(activeUser.email);
    const [pwd, setPwd] = useState(activeUser.pwd);
    const [firstName, setFirstName] = useState(activeUser.firstName);
    const [lastName, setLastName] = useState(activeUser.lastName);
    const [phoneNumber, setPhoneNumber] = useState(activeUser.phoneNumber);
    const [userBio, setUserBio] = useState('')

    function handleNewDetails(){
        editUser(firstName,lastName, email, pwd, phoneNumber, userBio)
    }
    return (
        <div className='p-profile'>
            <h3 className='mb-4'>Edit your profile</h3>
             <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" 
                            placeholder="your name" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Family Name</Form.Label>
                        <Form.Control type="text" 
                            placeholder="your family name" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" 
                            placeholder="Enter email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" 
                            placeholder="Enter email" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" 
                            placeholder="Password" 
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </Form.Group>
                    <FloatingLabel className='form-control' controlId="floatingTextarea2"  onChange={'handleTweetInput'}>
                    <Form.Label>Tell us a little bit about yourself</Form.Label>

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
                        onClick={''}>
                        Save Changes
                    </Button>
                </Form>
        </div>
    );
}

export default Profile;