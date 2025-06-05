import React from 'react';

type Props = {
  income: number;
  expenses: number;
};

const Graph: React.FC<Props> = ({ income, expenses }) => {
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '1rem', borderRadius: '8px' }}>
      <h3>Graph Placeholder</h3>
      <p>Income: ${income}</p>
      <p>Expenses: ${expenses}</p>
    </div>
  );
};

export default Graph;
