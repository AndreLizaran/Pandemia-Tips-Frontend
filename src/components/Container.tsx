// Modules
import React, { ReactNode } from 'react';

// Components
import Navbar from '../components/Navbar';

type ContainerProps = {
  children: ReactNode;
};

export default function Container({ children }: ContainerProps) {
  return (
    <>
      <Navbar />
      <main className='p-6'>{children}</main>
    </>
  );
}
