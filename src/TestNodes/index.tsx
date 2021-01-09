import React, { useState } from 'react';
import { Test } from '../types/graphql';
import onDeleteUpdateCache from '../utils/onDeleteUpdateCache';
import {
  useAddTestMutation,
  useDeleteTestMutation,
  useQueryTestQuery,
  useUpdateTestMutation,
} from './types/operations';

const TestNode: React.FC<{ test: Test }> = ({ test }) => {
  const [text, setText] = useState(test.test);
  const [updateTest] = useUpdateTestMutation();
  const [deleteTest] = useDeleteTestMutation({ update: onDeleteUpdateCache });
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };
  const handleUpdate = () => {
    updateTest({
      variables: {
        id: test.id as string,
        patch: {
          test: text,
        },
      },
    });
  };
  const handleDelete = () => {
    deleteTest({
      variables: {
        id: test.id as string,
      },
    });
  };
  return (
    <div>
      <h2>id: {test.id}</h2>
      <input
        onChange={handleChange}
        value={text}
        style={{ width: '100%', padding: '5px' }}
      />
      <div style={{ paddingTop: '10px', display: 'flex' }}>
        <button
          onClick={handleUpdate}
          disabled={text === test.test}
          style={{ padding: '5px', margin: '10px' }}
        >
          Update Test
        </button>
        <button
          onClick={handleDelete}
          style={{ padding: '5px', margin: '10px' }}
        >
          Delete Test
        </button>
      </div>
      <hr />
    </div>
  );
};

const AddTestNode: React.FC = () => {
  const [addTest] = useAddTestMutation({
    refetchQueries: ['queryTest'],
  });
  const [value, setValue] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleSubmit = () => {
    addTest({
      variables: {
        test: {
          test: value,
        },
      },
    });
  };
  return (
    <div>
      <input
        placeholder="New Test Node"
        value={value}
        onChange={handleChange}
        style={{ width: '100%', padding: '5px' }}
      />
      <button
        onClick={handleSubmit}
        disabled={value === ''}
        style={{ padding: '5px', margin: '10px' }}
      >
        Add New Test
      </button>
    </div>
  );
};

export const TestNodes: React.FC = () => {
  const { data, loading, error } = useQueryTestQuery();
  if (loading) return <h1>loading...</h1>;
  if (error) {
    console.error(error);
    return <h1>error! See console</h1>;
  }
  return (
    <div style={{ padding: '20px' }}>
      <h1>Test Nodes</h1>
      <p>
        This is a simple form that allows you to do all CRUD operations on the{' '}
        <code>Test</code> type.
      </p>
      {data?.queryTest?.map((testNode) => (
        <TestNode test={testNode as Test} />
      ))}
      <br />
      <AddTestNode />
    </div>
  );
};
