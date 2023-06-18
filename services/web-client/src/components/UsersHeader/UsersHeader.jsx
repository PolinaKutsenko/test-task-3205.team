import { useTranslation } from 'react-i18next';

import './UsersHeader.css';

const UsersHeader = () => {
  const { t } = useTranslation();

  return (
    <div className="userListHeader">
      <div className="emailHeader">{t('mainPage.email')}</div>
      <div className="numberHeader">{t('mainPage.number')}</div>
    </div>
  );
}

export default UsersHeader;
