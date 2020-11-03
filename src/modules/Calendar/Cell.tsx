import React from 'react';

type Props = {
  busy: boolean;
};

const Cell: React.FC<Props> = ({ busy }) => {
  return (
    <div
      style={{
        backgroundColor: busy ? 'white' : 'green',
        height: 20,
        width: 40,
        border: 'solid',
        borderWidth: 1,
      }}
    />
  );
};

export default Cell;
