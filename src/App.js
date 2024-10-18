import './App.css';
import { Alert, Container } from 'react-bootstrap';
import { Route, Routes } from 'react-router-dom';
import Counter from './gems/Counter';
// import MultiStepForm from './gems/MultiStepForm';
// import StrapForm from './gems/StrapForm';
import Todo from './real/ToDo';
import NavBar from './gems/NavBar';

const App = () => {
  return (
    <div>
      <NavBar />

      {/* Main Content */}
      <Container className='mt-4'>
        <Routes>
          {/* Define routes */}
          <Route
            path='/'
            element={
              <div>
                <h1>TEST TSET TEST</h1>
                <p>Hit the ground running</p>
                {/*<StrapForm />*/}
                <Todo />
                <Alert dismissible variant='danger' className={'space'}>
                  <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                  <p>Change this and that and try again.</p>
                </Alert>
              </div>
            }
          />
          <Route path='/contact' element={<h2>Contact Page</h2>} />
          <Route path='/counter' element={<Counter />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
