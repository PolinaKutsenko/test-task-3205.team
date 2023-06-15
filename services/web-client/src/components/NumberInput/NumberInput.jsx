import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import InputMask from 'react-input-mask';

import './NumberInput.css';

const NumberInput = ({ valueProp, onChangeProp, authFailed }) => {
  const { t } = useTranslation();

  const inputClass = cn('formInput', 'textNormMiddle', {
    'error': authFailed,
  });

  return (
    <label htmlFor="number" className={inputClass}>
      <InputMask
        mask="99-99-99"
        type="text"
        id="number"
        name="number"
        placeholder={t('mainPage.number')}
        value={valueProp}
        onChange={onChangeProp}
      />
    </label>
  );
}

export default NumberInput;
