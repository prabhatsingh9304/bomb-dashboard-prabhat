import React from 'react';
import styled from 'styled-components';

import background from '../../assets/img/background_dashboard.png';

const Dashboard: React.FC = () => {
  // console.log({background})
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        background: 'url(' + background + ')',
        backgroundSize: 'cover',
        flexDirection: 'column',
      }}
    >
      
    </div>
  );
};

const Card = styled.div`
  display: flex;
  padding: 10px;
  background: rgba(35, 40, 75, 0.75);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  flex-direction: column;
  margin: 20px;
`;

export default Dashboard;
