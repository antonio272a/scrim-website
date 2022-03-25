import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { capitalize, lowerCase } from 'lodash';
import { useParams } from 'react-router-dom';

function UserContactsEdit({ userContacts, setUserContacts, cancelEdit }) {
  
  const [providerField, setProviderField] = useState('');
  const [contactField, setContactField] = useState('');
  const [isAddingContact, setIsAddingContact] = useState('');
  const {userId} = useParams();

  const handleEditButton = ({ target }) => {
    const { id } = target.closest("div .contactContainer");
    const index = Number(id.slice(-1));
    const provider = lowerCase(document.querySelector(`#${id} .provider`).innerText);
    const contact = document.querySelector(`#${id} .contact`).innerText;
    setUserContacts((prev) => (prev.filter((_input, i) => i !== index)))
    setProviderField(provider)
    setContactField(contact)
  }

  return (
    <section className="align-self-center w-75 justify-content center d-flex flex-column align-items-center">
      <div className="fs-2 fw-bolder text-center my-2">Contatos:</div>
      <div className="d-flex w-100">
        {userContacts.map(({ provider, contact }, index) => (
          <div
            id={`contact-${index}`}
            key={`contact-${provider}-${index}`}
            className="d-flex justify-content-around w-100 align-items-center mb-4 contactContainer"
          >
            <div>
              <span className="fs-3 fw-bold provider">
                {capitalize(provider)}
              </span>
              <span className='fs-3 fw-bold me-1'>: </span>
              <span className="fs-4 contact">{contact}</span>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-primary me-2"
                onClick={handleEditButton}
              >
                Editar
              </button>
              <button type="button" className="btn btn-danger">
                X
              </button>
            </div>
          </div>
        ))}
      </div>
      {isAddingContact ? (
        <div>

        </div>
      ) : (
        <button
          type="button"
          onClick={() => {
            setIsAddingContact(true);
          }}
          className="btn btn-primary"
        >
          Adicionar contato
        </button>
      )}
    </section>
  );
}

UserContactsEdit.propTypes = {
  userContacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  setUserContacts: PropTypes.func.isRequired,
  cancelEdit: PropTypes.func.isRequired,
};

export default UserContactsEdit
