import React, { useState } from 'react';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';
function SignUp(props) {
    const {showSignUp, handleCloseSignUp} = props
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [ConfirmPwd, setConfirmPwd] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const [isPwadMatch, setIsPwdMatch] = useState(true)
    const { activeUser, handleSignUp } = useAuth();



    function onSignUp () {
        // if (pwd !== ConfirmPwd) setIsPwdMatch(false)
        handleSignUp ({firstName,lastName, email, pwd, phoneNumber, ConfirmPwd})
        handleCloseSignUp()
    }

    return (
        <div>
              <Modal show={showSignUp} onHide={handleCloseSignUp}>
                <Modal.Header closeButton>
                <Modal.Title>Fill the details bellow to create a new user</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>First Name</Form.Label>
                        <Form.Control type="text" 
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Family Name</Form.Label>
                        <Form.Control type="text" 
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="text" 
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" 
                            value={pwd}
                            onChange={(e) => setPwd(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control type="password" 
                            value={ConfirmPwd}
                            onChange={(e) => setConfirmPwd(e.target.value)}
                        />
                    </Form.Group>
                    {!isPwadMatch && <Alert variant="danger">
                         passwords dosn't match
                        </Alert>}
                </Form>
                </Modal.Body>
                <Modal.Footer>
                <Button 
                    
                    variant="primary" 
                    onClick={onSignUp}>
                    Create user
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default SignUp;