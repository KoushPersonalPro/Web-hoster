import React from 'react';
import { Outlet } from 'react-router-dom';

export const SiteLayout = () => {
  return (
    <div className="min-h-screen">
      <Outlet />
    </div>
  );
};