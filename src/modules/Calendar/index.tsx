import React, { useState } from 'react';

import { useImmer } from 'use-immer';

import { Row, Col } from 'antd';

import Cell from './Cell';

const Calendar: React.FC = () => {
  const [cells, updateCells] = useImmer<boolean[][]>(new Array(10).fill(new Array(3).fill(true)));

  const [newVal, setNewVal] = useState(false);
  const [mouseDown, setMouseDown] = useState(false);

  return (
    <div
      onMouseDown={() => {
        setMouseDown(true);
      }}
      onMouseUp={() => {
        setMouseDown(false);
      }}
    >
      {cells.map((rows, i) => (
        <Row>
          {rows.map((busy, j) => (
            <Col>
              <div
                onMouseDown={() => {
                  setNewVal(!busy);
                  updateCells((draft) => {
                    draft[i][j] = !busy;
                  });
                }}
                onMouseEnter={() => {
                  if (!mouseDown) return;
                  updateCells((draft) => {
                    draft[i][j] = newVal;
                  });
                }}
              >
                <Cell busy={busy} />
              </div>
            </Col>
          ))}
        </Row>
      ))}
      <button
        onClick={() => {
          updateCells((draft) => {
            draft[2][2] = newVal;
          });
        }}
      >
        click
      </button>
    </div>
  );
};

export default Calendar;
