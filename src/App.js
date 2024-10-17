import React from 'react';
import './App.css';
import {Alert, Button, Container, Navbar} from "react-bootstrap";

function App() {

    const [count, setCount] = React.useState(0);
  return (
      <div>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="#home">Test</Navbar.Brand>
          </Container>
        </Navbar>

        {/* Main Content */}
        <Container className="mt-4">
          <h1>TEST TSET TEST</h1>
          <p>Hit the ground running</p>
            <p className={"space"}>{count}</p>

            <div>
                <Button onClick={()=>{
                setCount(count + 1)
            }} variant="primary" className={"me-2"}>Max</Button>
                <Button onClick={()=>{
                    setCount(count - 1)
                }} variant="primary">Min</Button>
            </div>


            <Alert dismissible variant="danger" className={"space"}>
                <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
                <p>Change this and that and try again.</p>
            </Alert>


        </Container>
      </div>
  );
}

export default App;
