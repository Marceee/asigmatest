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
      console.log('what in data.  ', data);
      setTodos(data.todos);
    } catch (error) {
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
    } catch (error) {
      console.log('error submitting todo', error);
    }
  };

  const handleToggle = async (id) => {
    try {
      await fetch(`http://localhost:3001/todos/${id}`, { method: 'PATCH' });
    } catch (e) {
      console.log('failed to toggle ', e);
    }
    const updatedTodos = todos.map((todo) => (todo.id ? { ...todo, completed: !todo.completed } : todo));
    setTodos(updatedTodos);
  };

  const handleDelete = async (index) => {
    try {
      await fetch(`http://localhost:3001/todos/${index}`, { method: 'DELETE' });
    } catch (e) {
      console.log('failed to delete ', e);
    }
    const updatedTodos = todos.filter((todo, i) => i !== index);
    setTodos(updatedTodos);
  };

  return (
    <Container className='mt-5'>
      <Row>
        <Col xs={12} md={6} lg={4} xl={3}>
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
                  <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.text}</span>
                  <Button variant='success' className='float-right' onClick={() => handleToggle(index)}>
                    {todo.completed ? 'Undo' : 'Done'}
                  </Button>
                  <Button variant='danger' className='float-right mr-2' onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
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
