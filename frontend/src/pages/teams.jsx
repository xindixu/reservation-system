import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import Card from '../components/card';
import { getAllTeams } from '../graphql/teams';


const Teams = () => {
  const { loading, error, data } = useQuery(getAllTeams);

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
