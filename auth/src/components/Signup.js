import React, { useRef, useState } from "react";
import { Card, Form, Button, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function Signup() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { signup } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label className="mb-0">Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group className="mt-2" id="password">
              <Form.Label className="mb-0">Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group className="mt-2" id="password-confirm">
              <Form.Label className="mb-0">Password Confirmation</Form.Label>
              <Form.Control type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="w-100 mt-2" type="submit">
              Sign Up
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Already have an account?<Link to="/Login">Log In</Link>
      </div>
    </>
  );
}
