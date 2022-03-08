import React from 'react'
import PropTypes from 'prop-types'

function UserInfo({ user }) {
  return (
    <section className='d-flex'>
      <div>{user.full_name}</div>
      <img
        width="70px"
        className="img-fluid rounded-circle border border-info border-2"
        src={user.avatar_url}
        alt="User Avatar"
      />
      <div>{}</div>
    </section>
  );
}

UserInfo.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired
}

export default UserInfo
