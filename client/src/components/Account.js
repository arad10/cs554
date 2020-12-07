import React from 'react';
import SignOutButton from './SignOut';

import '../App.scss';
import ChangePassword from './ChangePassword';

function Account() {
  return (
    <div>
      <h2>This is the account page</h2>
      <SignOutButton />
      <ChangePassword />
    </div>
  );
}

export default Account;