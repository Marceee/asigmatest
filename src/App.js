import './App.css';
import { Alert, Container, Navbar } from 'react-bootstrap';
import Counter from './Counter';

function App() {
  return (
    <div>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>Test</Navbar.Brand>
        </Container>
      </Navbar>

      {/* Main Content */}
      <Container className='mt-4'>
        <h1>TEST TSET TEST</h1>
        <p>Hit the ground running</p>

        <Counter />

        <Alert dismissible variant='danger' className={'space'}>
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>Change this and that and try again.</p>
        </Alert>
      </Container>
    </div>
  );
}

export default App;
