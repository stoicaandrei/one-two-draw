import React, { useState, useRef } from 'react';
import CanvasDraw from 'react-canvas-draw';
import { GithubPicker } from 'react-color';

import { Slider, Button, Row, Col } from 'antd';
import { UndoOutlined, ClearOutlined } from '@ant-design/icons';

type Props = {
  handleSave?: (blob: Blob) => void;
};

const DrawingCanvas: React.FC<Props> = ({ handleSave }) => {
  const [brushRadius, setBrushRadius] = useState(5);
  const [brushColor, setBrushColor] = useState('#333');

  const canvas = useRef<any>(null);

  const extractImage = () => {
    if (!handleSave) return;

    const canvasDiv = document.getElementsByClassName('canvas-draw')[0];
    const canvasElement = canvasDiv.getElementsByTagName('canvas')[1];

    canvasElement.toBlob((blob) => {
      if (!blob) return;
      handleSave(blob);
    });
  };

  return (
    <div>
      <Row>
        <Col>
          <CanvasDraw
            ref={canvas}
            lazyRadius={0}
            canvasWidth={1000}
            canvasHeight={600}
            brushRadius={brushRadius}
            brushColor={brushColor}
            catenaryColor={brushColor}
            style={{ borderWidth: 100, borderColor: 'black', border: 'solid' }}
            className="canvas-draw"
          />
        </Col>
        <Col>
          <Row>
            <Col>
              <Button onClick={() => canvas.current.undo()}>
                <UndoOutlined />
                Undo
              </Button>
            </Col>
            <Col>
              <Button onClick={() => canvas.current.clear()}>
                <ClearOutlined />
                Clear
              </Button>
            </Col>
          </Row>
          <Row>
            <Slider
              value={brushRadius}
              onChange={setBrushRadius}
              min={1}
              max={12}
              style={{ width: 200 }}
              trackStyle={{ backgroundColor: brushColor }}
              handleStyle={{ borderColor: brushColor }}
            />
          </Row>
          <Row>
            <GithubPicker color={brushColor} onChange={(a) => setBrushColor(a.hex)} />
          </Row>
        </Col>
      </Row>
      <Button onClick={extractImage}>I'm finished</Button>
    </div>
  );
};

export default DrawingCanvas;
