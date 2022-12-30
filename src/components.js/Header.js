import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Container, NavDropdown, Nav } from "react-bootstrap";

const Header = () => {
  const navigate = useNavigate();

  let userInfo;
  if (localStorage.getItem("userInfo")) {
    userInfo = JSON.parse(localStorage.getItem("userInfo"));
  }

  return (
    <div className="header">
      <Navbar bg="secondary" sticky="top">
        <Container>
          <Link to="/">
            <Navbar.Brand>SIMPLE WEB APP</Navbar.Brand>
          </Link>
          <Navbar.Toggle />
          {localStorage.getItem("userInfo") ? (
            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text style={{ display: "flex", marginRight: "10px" }}>
                <span style={{ marginRight: "10px", textTransform: "none" }}>
                  My profile:
                </span>

                <NavDropdown title={userInfo.firstName}>
                  <NavDropdown.Item href="/profile/edit">
                    Edit Profile
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    onClick={() => {
                      localStorage.removeItem("userInfo");
                      navigate("/");
                    }}
                  >
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              </Navbar.Text>
            </Navbar.Collapse>
          ) : (
            <Nav>
              <Nav.Link to="/login">Login</Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
