import React from 'react';
import PropTypes from 'prop-types';

import { ContactsList } from '../Phonebook.styled';
import ContactsItem from './ContactsItem';

export const Contacts = ({ filteredContacts, onDeleteContact }) => (
  <ContactsList>
    {filteredContacts.length > 0 &&
      filteredContacts.map(({ id, name, number }) => (
        <ContactsItem
          key={id}
          id={id}
          name={name}
          number={number}
          onDeleteContact={onDeleteContact}
        />
      ))}
  </ContactsList>
);

Contacts.propTypes = {
  filteredContacts: PropTypes.arrayOf(
    PropTypes.shape({
      number: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
    })
  ),
  onDeleteContact: PropTypes.func.isRequired,
};
