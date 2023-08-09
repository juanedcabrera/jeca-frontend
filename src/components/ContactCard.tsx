import React from 'react';
import { Contact } from '../types';

interface ContactCardProps {
  contact: Contact;
  onDelete: () => void;
  onEdit: (editedContact: Contact) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({
  contact,
  onDelete,
  onEdit,
}) => {
  const handleEditClick = () => {
    onEdit(contact);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h2 className="text-lg font-semibold">
        {contact.firstName} {contact.lastName}
      </h2>
      <p className="text-gray-600">{contact.jobTitle}</p>
      <p className="text-gray-600">{contact.company}</p>
      <p className="text-gray-600">{contact.email}</p>
      <div className="mt-4">
        <button
          className="mr-2 text-blue-500 hover:text-blue-700"
          onClick={onDelete}
        >
          Delete
        </button>
        <button onClick={handleEditClick}>Edit</button>{' '}
      </div>
    </div>
  );
};

export default ContactCard;
