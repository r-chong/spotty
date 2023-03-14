import React from "react";
import useAuth from "./useAuth";
import { Container, Form } from "react-bootstrap";

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  return (
    <Container>
      <Form.Control
        type="search"
        placeholder="Search Songs/Artists"
        // value={search}
        // onChange={(e) => setSearch(e.target.value)}
      />
    </Container>
  );
}
