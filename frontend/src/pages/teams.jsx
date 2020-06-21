import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import Card from '../components/card';

const TEAMS = gql`
  query {
    teams {
      id
      name
      description
      email
      phone
      managers {
        firstName
        lastName
        email
        phone
      }
    }
  }
`;

const Teams = () => {
  const { loading, error, data } = useQuery(TEAMS);

  if (loading) {
    return 'loading...';
  }
  if (error) {
    return `Error ${error.message}`;
  }
  return (
    <div className="flex flex-wrap items-center pb-16">
      {data.teams.map(({
        id, name, description, email,
        phone, managers,
      }) => (
        <div key={id}>
          <p>{name}</p>
          <p>{description}</p>
          <p>
            {email}
            {' '}
            {phone}
          </p>
          {managers.map(manager => <Card user={manager} />)}

        </div>
      ))}
    </div>
  );
};


export default Teams;
