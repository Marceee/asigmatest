import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <Navbar bg='dark' variant='dark'>
      <Container>
        <Navbar.Brand href='/'>Test</Navbar.Brand>

        <Nav className='ms-auto'>
          <Nav.Link as={Link} to='/'>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to='/contact'>
            Contact
          </Nav.Link>
          <Nav.Link as={Link} to='/counter'>
            Test
          </Nav.Link>{' '}
          {/* This will link to the counter */}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
