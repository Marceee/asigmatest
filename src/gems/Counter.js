import React from 'react';
import { Button } from 'react-bootstrap';

const Counter = () => {
  const [count, setCount] = React.useState(0);
  return (
    <>
      <p className={'space'}>{count}</p>
      <div>
        <Button
          onClick={() => {
            setCount(count + 1);
          }}
          variant='primary'
          className={'me-2'}
        >
          Max
        </Button>
        <Button
          onClick={() => {
            setCount(count - 1);
          }}
          variant='primary'
        >
          Min
        </Button>
      </div>
    </>
  );
};

export default Counter;
