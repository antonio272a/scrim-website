import React from 'react'
import PropTypes from 'prop-types'

function UserInfo({ user }) {
  return (
    <section className='d-flex w-50 flex-column align-self-center mt-5 align-items-center'>
      <img
        width="100px"
        className="img-fluid rounded-circle border border-info border-2"
        src={user.avatar_url}
        alt="User Avatar"
      />
      <div className='fs-2 fw-bold my-3'>{user.full_name}</div>
    </section>
  );
}

UserInfo.propTypes = {
  user: PropTypes.objectOf(PropTypes.any).isRequired
}

export default UserInfo
