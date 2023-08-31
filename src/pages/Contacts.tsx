import React from 'react';
import ContactsList from '../components/ContactsList';

const Contacts: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Contacts</h1>
      <ContactsList />
    </div>
  );
};

export default Contacts;

