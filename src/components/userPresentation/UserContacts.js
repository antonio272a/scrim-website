import React from 'react';
import PropTypes from 'prop-types';
import { capitalize } from 'lodash';

function UserContacts({ userContacts }) {

  return (
    <section className="align-self-center">
      <div className="fs-2 fw-bolder text-center my-2">Contatos:</div>
      <div>
        {userContacts.map(({ provider, contact }, index) => (
          <div key={`contact-${provider}-${index}`}>
            <span className="fs-3 fw-bold">{capitalize(provider)}: </span>
            <span className="fs-4">{contact}</span>
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