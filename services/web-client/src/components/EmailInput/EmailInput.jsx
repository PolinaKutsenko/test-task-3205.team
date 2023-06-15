import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import './EmailInput.css';

const EmailInput = ({ valueProp, onChangeProp, authFailed }) => {
  const { t } = useTranslation();

  const inputClass = cn('formInput', 'textNormMiddle', {
    'error': authFailed,
  });

  return (
    <label htmlFor="email" className={inputClass}>
      <input
          type="text"
          id="email"
          name="email"
          placeholder={t('mainPage.email')}
          value={valueProp}
          onChange={onChangeProp}
      />
    </label>
  );
}

export default EmailInput;
