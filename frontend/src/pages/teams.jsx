import React from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Card, Col, Row } from 'antd';
import { GET_ALL_TEAMS } from '../graphql/teams';


const Teams = () => {
  const { loading, error, data } = useQuery(GET_ALL_TEAMS);
  // const [] = useMutation(GET_ALL_TEAMS);

  if (loading) {
    return 'loading...';
  }
  if (error) {
    return `Error ${error.message}`;
  }
  return (
    <Row gutter={16}>

      {data.teams.map(({
        id, name, description, email,
        phone, managers,
      }) => (
        <Col span={8}>
          <Card title={name} hoverable>
            {description}
            <p>{email}</p>
            <a>{phone}</a>

          </Card>
        </Col>
      ))}
    </Row>
  );
};


export default Teams;
