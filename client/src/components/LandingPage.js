import React, {useState} from 'react'
import Auth from '../utils/auth'
import { Form, Col, Row, Button, InputGroup } from 'react-bootstrap'




export default function LandingPage() {

  const [validated, setValidated] = useState(false);

const handleSubmit = (event) => {
  const form = event.currentTarget;
  if (form.checkValidity() === false) {
    event.preventDefault();
    event.stopPropagation();
  }

  setValidated(true);
};

  return (

    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <Row className="mb-3">
      <Form.Group as={Col} md="4" controlId="validationCustom01">
        <Form.Label>First name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="First name"
          defaultValue="Mark"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="4" controlId="validationCustom02">
        <Form.Label>Last name</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Last name"
          defaultValue="Otto"
        />
        <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
      </Form.Group>
      <Form.Group as={Col} md="4" controlId="validationCustomUsername">
        <Form.Label>Username</Form.Label>
        <InputGroup hasValidation>
          <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Username"
            aria-describedby="inputGroupPrepend"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
      <Form.Group as={Col} md="4" >
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <InputGroup.Text id="inputGroupPrepend"></InputGroup.Text>
          <Form.Control
            type="text"
            placeholder="Password"
            aria-describedby="inputGroupPrepend"
            required
          />
          <Form.Control.Feedback type="invalid">
            Please choose a username.
          </Form.Control.Feedback>
        </InputGroup>
      </Form.Group>
    </Row>
  
    
    <Form.Group className="mb-3">
      <Form.Check
        required
        label="Agree to terms and conditions"
        feedback="You must agree before submitting."
        feedbackType="invalid"
      />
    </Form.Group>
    <Button type="submit">Submit form</Button>
  </Form>
    
  )
}
