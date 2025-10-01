// This is the Navigation Bar component
import React from 'react'; // Import React to use JSX syntax
import { Nav, Navbar, Container } from 'react-bootstrap'; // Import components from React-Bootstrap for styling
import { Link } from 'react-router-dom'; // Import Link for internal routing (allows navigation within the app without page reload)

export default function NavigationBar() {
  return (
    // Navbar component with primary color, dark theme, and fixed to the top of the page
    <Navbar bg="primary" variant="dark" fixed="top">
      <Container>
        {/* Brand section of the Navbar, typically the site name or logo */}
        <Navbar.Brand href="#home">Navbar</Navbar.Brand>

        {/* Navigation links wrapped in 'Nav' component */}
        <Nav className="me-auto">
          {/* Using 'Link' component for client-side routing (prevents page reload on navigation) */}
          <Nav.Link as={Link} to="/">Home</Nav.Link> {/* Link to Home route */}
          <Nav.Link as={Link} to="/read">Read</Nav.Link> {/* Link to Read route */}
          <Nav.Link as={Link} to="/create">Create</Nav.Link> {/* Link to Create route */}
        </Nav>
      </Container> 
    </Navbar>
  );
}
