// These are the IMPORTANT imports for the App
import { useState } from 'react' // Import useState for state management
import reactLogo from './assets/react.svg' // Import the React logo (not used in this code, but probably for display)
import viteLogo from '/vite.svg' // Import the Vite logo (again, not used here)
import './App.css' // Import the CSS file for styling
import Content from './components/Content' // Import the Content component
import Header from './components/Header' // Import the Header component
import Footer from './components/footer.jsx' // Import the Footer component
import { BrowserRouter } from 'react-router-dom' // Import BrowserRouter for routing
import { Routes } from 'react-router-dom' // Import Routes to define different routes
import { Route } from 'react-router-dom' // Import Route to define the path for each component
import NavigationBar from './components/NavigationBar.jsx' // Import the NavigationBar component (though not used in the JSX)
import 'bootstrap/dist/css/bootstrap.min.css' // Import Bootstrap CSS for styling
import { Nav, Navbar, Container } from 'react-bootstrap' // Import Bootstrap components for navigation

// Input the Data you want to show into the App below
function App() {
  const [count, setCount] = useState(0) // Declare state 'count' with initial value 0

  return (
    <>
      {/* Wrap the app in BrowserRouter to enable routing */}
      <BrowserRouter>
        {/* Navbar component for navigation */}
        <Navbar bg="primary" data-bs-theme="dark">
          {/* Brand of the Navbar */}
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          
          {/* Navigation Links */}
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link> {/* Home Link */}
            <Nav.Link href="/read">Read</Nav.Link> {/* Read Link */}
            <Nav.Link href="/create">Create</Nav.Link> {/* Create Link */}
          </Nav>
        </Navbar>

        {/* Define Routes for different pages */}
        <Routes>
          <Route path="/" element={<Content />} /> {/* Home Route */}
          <Route path="/read" element={<Header />} /> {/* Read Route */}
          <Route path="/create" element={<Footer />} /> {/* Create Route */}
        </Routes>
      </BrowserRouter>
    </>
  )
} // This will show the Nav bar in the App

// Export the App component to be used in other parts of the app
export default App
