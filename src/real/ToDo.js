import { useEffect, useState } from 'react';
import { Container, Row, Col, Form, Button, ListGroup, ListGroupItem } from 'react-bootstrap';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchToDos();
  }, []);

  const fetchToDos = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/todos');
      const data = await response.json();
      setTodos(data.todos);
    } catch (error) {
      alert(`Error fetching todos: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: newTodo, completed: false })
      });
      const data = await response.json();
      setTodos([...todos, data]);
      setNewTodo('');
      await fetchToDos();
    } catch (error) {
      alert(`Failed to submit todo: ${error.message}`);
      console.log('error submitting todo', error);
    }
  };

  const handleToggle = async (id) => {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, { method: 'PATCH' });
    } catch (e) {
      console.log('failed to toggle ', e);
    }
    const updatedTodos = todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    setTodos(updatedTodos);
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, { method: 'DELETE' });
    } catch (e) {
      console.log('failed to delete ', e);
    }
    await fetchToDos();
    // const updatedTodos = todos.filter((todo, i) => i !== index);
    // setTodos(updatedTodos);
  };

  return (
    <Container className='mt-5'>
      <Row>
        <Col xs={12} md={6} lg={4} xl={8}>
          <h1>To Do App</h1>

          <Form onSubmit={handleSubmit}>
            <Form.Group controlId='newTodo'>
              <Form.Control type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} placeholder='Add new todo' />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Add To Do
            </Button>
          </Form>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ListGroup>
              {todos.map((todo, index) => (
                <ListGroupItem key={index}>
                  <Row className='align-items-center'>
                    {/* Todo Text */}
                    <Col xs={8} className='text-truncate'>
                      <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
                    </Col>

                    {/* Action Buttons */}
                    <Col xs={4} className='d-flex justify-content-end'>
                      <Button variant='success' className='mx-2' onClick={() => handleToggle(todo.id)}>
                        {todo.completed ? 'Undo' : 'Done'}
                      </Button>
                      <Button variant='danger' onClick={() => handleDelete(todo.id)}>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default TodoApp;
