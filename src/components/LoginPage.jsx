import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

function LoginPage(props) {
    const { onLogin } = useAuth();

    // const {modalShow, handleModalShow} = props
    const {showLogIn, handleCloseLogIn} = props
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");

    async function handleLogin () {
        try{
            await onLogin(email, pwd)
            handleCloseLogIn()
        }catch (err) {
            console.log(err)
        }
    }

    return (
        <div >
            <Modal show={showLogIn} onHide={handleCloseLogIn}>
                <Modal.Header closeButton>
                <Modal.Title>Login to your account</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control type="email" 
                                placeholder="Enter email" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Form.Text className="text-muted">
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" 
                                placeholder="Password" 
                                value={pwd}
                                onChange={(e) => setPwd(e.target.value)}
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="primary" 
                    onClick={handleLogin}>
                    login
                </Button>
                </Modal.Footer>
            </Modal>
            </div>
    );
}

export default LoginPage;