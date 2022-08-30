import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';
import context from '../../context/MyContext';
import UserContactsText from '../../translations/components/userPresentation/userContacts.json';

function UserContacts({ userContacts }) {
  const { language } = useContext(context)

  const text = UserContactsText[language];

  return (
    <section className='align-self-center'>
      <div className='fs-2 fw-bolder text-center my-2'>{text['contacts']}</div>
      <div>
        {userContacts.map(({ provider, contact }, index) => (
          <div key={`contact-${provider}-${index}`}>
            <span className='fs-3 fw-bold'>{capitalize(provider)}: </span>
            <span className='fs-4'>{contact}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

UserContacts.propTypes = {
  userContacts: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default UserContacts