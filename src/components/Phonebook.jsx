import { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import shortid from 'shortid';

import { ContactForm } from './ContactForm';
import { Contacts } from './Contacts';
import { Filter } from './Filter';
import { getFromLocalStorage, changeLocalStorage } from 'functions';
import { PhonebookTitle, ContactsTitle } from './Phonebook.styled';

export const Phonebook = () => {
  const defaultContacts = [
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ];

  const [contacts, setContacts] = useState(
    getFromLocalStorage('contacts', defaultContacts)
  );
  const [filter, setFilter] = useState('');

  const changeContacts = newContact => {
    const errorArray = contacts.filter(
      contact => contact.name.toLowerCase() === newContact.name.toLowerCase()
    );

    if (errorArray.length === 0) {
      const newContactsArray = [
        { ...newContact, id: shortid.generate() },
        ...contacts,
      ];
      setContacts(newContactsArray);
      changeLocalStorage('contacts', newContactsArray);
      toast.success('You add a new contact in your Phonebook!');
    } else {
      toast.info('This contact is already in your Phonebook!');
    }
  };

  const changeFilter = e => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    changeLocalStorage('filter', newFilter);
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase().trim();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const deleteContact = deleteId => {
    const newContacts = contacts.filter(contact => contact.id !== deleteId);
    setContacts(newContacts);
    changeLocalStorage('contacts', newContacts);
  };

  const filteredContacts = getFilteredContacts();

  return (
    <>
      <PhonebookTitle>Phonebook</PhonebookTitle>
      <ContactForm onChangeContacts={changeContacts} />

      <ContactsTitle>Contacts</ContactsTitle>
      <Filter value={filter} onChange={changeFilter} />
      <Contacts
        filteredContacts={filteredContacts}
        onDeleteContact={deleteContact}
      />
      <ToastContainer autoClose={2000} position="top-center" theme="colored" />
    </>
  );
};
