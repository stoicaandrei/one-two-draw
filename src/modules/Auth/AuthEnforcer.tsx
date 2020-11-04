import React, { useState, useContext } from 'react';

import { Modal, Row, Col, Input, Button } from 'antd';

import { UserContext } from 'contexts';

const AuthEnforcer: React.FC = ({ children }) => {
  const [name, setName] = useState('');

  const { user, loading, error, loginWithName } = useContext(UserContext);

  if (user) return <div>{children}</div>;

  return (
    <Modal footer={null} visible={true} closable={false}>
      <Row justify="center">
        <Col>
          <p>Please enter your name to continue</p>
          <Input
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: 200 }}
          />
          <Button type="primary" loading={loading} onClick={() => name && loginWithName(name)}>
            Login
          </Button>
          {error}
        </Col>
      </Row>
    </Modal>
  );
};

export default AuthEnforcer;
