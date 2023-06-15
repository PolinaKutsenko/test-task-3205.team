import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import './UserItem.css';

const UserItem = ({user}) => {
  const { t } = useTranslation();

  const parsedNumber = useMemo(() => {
    const firstPair = user.number.slice(0, 2);
    const secondPair = user.number.slice(2, 4);
    const thirdPair = user.number.slice(4);

    return `${firstPair}-${secondPair}-${thirdPair}`;
  }, [user]);

  return (
    <div className="userItem textNormMiddle">
      <div>{user.email}</div>
      <div>{parsedNumber}</div>
    </div>
  );
}

export default UserItem;
