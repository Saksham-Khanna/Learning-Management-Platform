import React from 'react';
import BackToDashboard from './components/BackToDashboard';

const Layout = ({ children }) => {
  return (
    <div style={{ position: 'relative', paddingTop: '60px' }}>
      <BackToDashboard />
      {children}
    </div>
  );
};

export default Layout;
