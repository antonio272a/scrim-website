import React from 'react'
import PropTypes from 'prop-types'
import defaultAvatar from '../../images/default-avatar.png'
import { Link } from 'react-router-dom';

function Contact({ discord, ownerId, discordAvatar }) {
  
  return (
    <section className="d-flex align-items-center justify-content-around mt-5 py-2 bg-light">
      <img
        width="70px"
        className="img-fluid rounded-circle border border-info border-2"
        src={discordAvatar}
        alt="User Avatar"
      />
      <div>
        <span className="me-2 fw-normal fs-4">
          Captain: {discord.split("#")[0]}
        </span>
      </div>
      <div className="nav nav-pills">
        <Link className=" mx-2 nav-link active" to={`/profile/${ownerId}`}>
          Get in touch
        </Link>
      </div>
    </section>
  );
}

Contact.propTypes = {
  discord: PropTypes.string.isRequired,
  discordId: PropTypes.string.isRequired,
  discordAvatar: PropTypes.string
}

Contact.defaultProps = {
  discordAvatar: defaultAvatar
};

export default Contact
