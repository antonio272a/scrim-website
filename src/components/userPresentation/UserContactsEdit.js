import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { capitalize, lowerCase } from "lodash";
import Select from "react-select";
import context from '../../context/MyContext';
import UserContactsEditText from '../../translations/components/userPresentation/userContactsEdit.json';

function UserContactsEdit({ userContacts, setUserContacts, finishEdit }) {
  const { language } = useContext(context);
  const [providerField, setProviderField] = useState("");
  const [contactField, setContactField] = useState("");
  const [isAddingContact, setIsAddingContact] = useState("");

  const text = UserContactsEditText[language];

  const providerOptions = [
    { label: "Discord", value: "Discord" },
    { label: "WhatsApp", value: "WhatsApp" },
    { label: "Email", value: "Email" },
  ];

  const saveContact = () => {
    console.log(providerField, contactField);
    setUserContacts([
      ...userContacts,
      { provider: providerField.value, contact: contactField },
    ]);
    setProviderField("");
    setContactField("");
    setIsAddingContact(false);
  };

  const cancelAdd = () => {
    setProviderField("");
    setContactField("");
    setIsAddingContact(false);
  };

  const handleDeleteButton = ({target}) => {
    const { id } = target.closest("div .contactContainer");
    const index = Number(id.slice(-1));
    setUserContacts((prev) => prev.filter((_input, i) => i !== index));
  }

  const handleEditButton = ({ target }) => {
    const { id } = target.closest("div .contactContainer");
    const index = Number(id.slice(-1));
    const provider = lowerCase(
      document.querySelector(`#${id} .provider`).innerText
    );
    const contact = document.querySelector(`#${id} .contact`).innerText;
    setUserContacts((prev) => prev.filter((_input, i) => i !== index));
    setProviderField({ label: provider, value: provider });
    setContactField(contact);
    setIsAddingContact(true);
  };

  return (
    <section className='align-self-center w-75 justify-content center d-flex flex-column align-items-center'>
      <div className='fs-2 fw-bolder text-center my-2'>{text['contacts']}</div>
      <div className='d-flex flex-column w-100'>
        {userContacts.map(({ provider, contact }, index) => (
          <div
            id={`contact-${index}`}
            key={`contact-${provider}-${index}`}
            className='d-flex justify-content-between w-100 align-items-center mb-4 contactContainer'
          >
            <div>
              <span className='fs-3 fw-bold provider'>
                {capitalize(provider)}
              </span>
              <span className='fs-3 fw-bold me-1'>: </span>
              <span className='fs-4 contact'>{contact}</span>
            </div>
            <div>
              <button
                type='button'
                className='btn btn-primary me-2'
                onClick={handleEditButton}
              >
                {text['edit']}
              </button>
              <button
                type='button'
                className='btn btn-danger'
                onClick={handleDeleteButton}
              >
                X
              </button>
            </div>
          </div>
        ))}
      </div>
      {isAddingContact ? (
        <div className='d-flex align-items-center'>
          <div className='d-flex align-items-center mx-4'>
            <Select
              id='provider-select'
              width='100px'
              options={providerOptions}
              value={providerField}
              onChange={(provider) => {
                setProviderField(provider);
              }}
              placeholder={text['provider']}
            />
            <div className='form-floating mx-5'>
              <input
                id='new-contact'
                className='form-control'
                type='text'
                value={contactField}
                onChange={({ target: { value } }) => setContactField(value)}
              />
              <label htmlFor='new-contact'>{text['contact']}</label>
            </div>
          </div>
          <div className='justify-self-end'>
            <button
              type='button'
              className='btn btn-success mx-2'
              onClick={saveContact}
            >
              {text['save']}
            </button>
            <button
              type='button'
              className='btn btn-danger mx-2'
              onClick={cancelAdd}
            >
              X
            </button>
          </div>
        </div>
      ) : (
        <div className='d-flex flex-column align-items-center justify-content-center'>
          <button
            type='button'
            onClick={() => {
              setIsAddingContact(true);
            }}
            className='btn btn-primary'
          >
            {text['add']}
          </button>
          <div className='m-4'>
            <button
              type='button'
              className='btn btn-success mx-2'
              onClick={() => finishEdit(false)}
            >
              {text['save-changes']}
            </button>
            <button
              type='button'
              className='btn btn-danger mx-2'
              onClick={() => finishEdit(true)}
            >
              {text['cancel']}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

UserContactsEdit.propTypes = {
  userContacts: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.any)).isRequired,
  setUserContacts: PropTypes.func.isRequired,
  finishEdit: PropTypes.func.isRequired,
};

export default UserContactsEdit;
