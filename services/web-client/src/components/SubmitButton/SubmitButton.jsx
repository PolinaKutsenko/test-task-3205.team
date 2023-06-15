import { useTranslation } from 'react-i18next';

import './SubmitButton.css';

const SubmitButton = () => {
  const { t } = useTranslation();

  return (
    <button className="submitButton" type="submit">
      <p className="textBoldNormal">{t('mainPage.getUsers')}</p>
    </button>
  );
}

export default SubmitButton;
