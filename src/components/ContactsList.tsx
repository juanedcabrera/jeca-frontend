import React, { useState } from 'react';
import ContactCard from './ContactCard';
import { Contact } from '../types';

const ContactsList: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState<Contact>({
    id: 0,
    content: '',
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    jobTitle: '',
  });

  const handleAddContact = () => {
    const newId =
      contacts.length > 0 ? contacts[contacts.length - 1].id + 1 : 1;
    const updatedContact = { ...newContact, id: newId };
    const updatedContacts = [...contacts, updatedContact];
    setContacts(updatedContacts);
    setNewContact({
      id: 0,
      content: '',
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      jobTitle: '',
    });
    setShowForm(false);
  };

  const handleDeleteContact = (id: number) => {
    const updatedContacts = contacts.filter((contact) => contact.id !== id);
    setContacts(updatedContacts);
  };

  const handleEditContact = (editedContact: Contact) => {
    setShowForm(true);
    setNewContact(editedContact); 
  };

  const handleSaveEdit = () => {
    const updatedContacts = contacts.map((contact) =>
      contact.id === newContact.id ? newContact : contact
    );
    setContacts(updatedContacts);

    setNewContact({
      id: 0,
      content: '',
      firstName: '',
      lastName: '',
      email: '',
      company: '',
      jobTitle: '',
    });
    setShowForm(false);
  };

  return (
    <div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setShowForm(true)}
      >
        Add Contact
      </button>
      {showForm && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold mb-2">
            {newContact.id === 0 ? 'Add Contact' : 'Edit Contact'}
          </h2>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              if (newContact.id === 0) {
                handleAddContact();
              } else {
                handleSaveEdit(); // Call the editing function
              }
            }}
          >
            <input
              type="text"
              placeholder="First Name"
              value={newContact.firstName}
              onChange={(e) =>
                setNewContact({ ...newContact, firstName: e.target.value })
              }
              className="border rounded-md p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={newContact.lastName}
              onChange={(e) =>
                setNewContact({ ...newContact, lastName: e.target.value })
              }
              className="border rounded-md p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Email"
              value={newContact.email}
              onChange={(e) =>
                setNewContact({ ...newContact, email: e.target.value })
              }
              className="border rounded-md p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Company"
              value={newContact.company}
              onChange={(e) =>
                setNewContact({ ...newContact, company: e.target.value })
              }
              className="border rounded-md p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Job Title"
              value={newContact.jobTitle}
              onChange={(e) =>
                setNewContact({ ...newContact, jobTitle: e.target.value })
              }
              className="border rounded-md p-2 mb-2"
            />
            <input
              type="text"
              placeholder="Notes"
              value={newContact.content}
              onChange={(e) =>
                setNewContact({ ...newContact, content: e.target.value })
              }
              className="border rounded-md p-2 mb-2"
            />

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              {newContact.id === 0 ? 'Add' : 'Save'}
            </button>
            <button
              className="ml-2 text-red-500 hover:text-red-700"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {contacts.map((contact) => (
          <ContactCard
            key={contact.id}
            contact={contact}
            onDelete={() => handleDeleteContact(contact.id)}
            onEdit={() => handleEditContact(contact)}
          />
        ))}
      </div>
    </div>
  );
};

export default ContactsList;
