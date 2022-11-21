import { useState } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';

import {
  PhonebookForm,
  PhonebookFormButton,
  PhonebookFormLabel,
  PhonebookFormInput,
} from './Phonebook.styled';

export const ContactForm = ({ onChangeContacts }) => {
  const defaultName = '';
  const defaultNumber = '';

  const getFromLocalStorage = (key, defaultValue) => {
    return JSON.parse(window.localStorage.getItem(key)) ?? defaultValue;
  };
  const changeLocalStorage = (key, state) => {
    window.localStorage.setItem(key, JSON.stringify(state));
  };

  const [name, setName] = useState(getFromLocalStorage('name', defaultName));
  const [number, setNumber] = useState(
    getFromLocalStorage('number', defaultNumber)
  );

  const nameId = shortid.generate();
  const telId = shortid.generate();

  const reset = () => {
    setName('');
    setNumber('');
  };

  const handleChange = e => {
    e.preventDefault();

    const { name, value } = e.target;

    if (name === 'name') {
      setName(value);
      changeLocalStorage('name', value);
    }

    if (name === 'number') {
      setNumber(value);
      changeLocalStorage('number', value);
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    onChangeContacts({ name, number });

    reset();
    changeLocalStorage('name', '');
    changeLocalStorage('number', '');
  };

  return (
    <>
      <PhonebookForm onSubmit={handleSubmit}>
        <PhonebookFormLabel htmlFor={nameId}>Name</PhonebookFormLabel>
        <PhonebookFormInput
          type="text"
          name="name"
          pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
          title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
          required
          id={shortid.generate()}
          value={name}
          onChange={handleChange}
        />
        <PhonebookFormLabel htmlFor={telId}>Number</PhonebookFormLabel>
        <PhonebookFormInput
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={number}
          onChange={handleChange}
        />
        <PhonebookFormButton type="submit">Add contact</PhonebookFormButton>
      </PhonebookForm>
    </>
  );
};

ContactForm.propTypes = { onChangeContacts: PropTypes.func.isRequired };
