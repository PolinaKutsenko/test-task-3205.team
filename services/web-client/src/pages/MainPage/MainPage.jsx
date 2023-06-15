import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import InputMask from 'react-input-mask';

import SubmitButton from '../../components/SubmitButton/SubmitButton.jsx';
import EmailInput from '../../components/EmailInput/EmailInput.jsx';
import NumberInput from '../../components/NumberInput/NumberInput.jsx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx';
import UserItem from '../../components/UserItem/UserItem.jsx';
import './MainPage.css';

const MainPage = () => {
  const { t } = useTranslation();
  const users = useSelector((state) => state.users.users);
  const loadingStatus = useSelector((state) => state.users.loadingStatus);
 
  const formik = useFormik({
    initialValues: {
      email: '',
      number: '',
    },
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email(t('mainPage.validationErrors.invalidEmail'))
        .required(t('mainPage.validationErrors.required')),
      number: yup
        .string(),
    }),
    onSubmit: ({ email, number }) => {
      console.log({ email, number });
    },
  });

  const mainPageContainer = cn('login-container', {
    'login-container-error': formik.errors.username && formik.touched.username,
  });

  const serverAnswer = useMemo(() => {
    if (loadingStatus === 'idle' && !users.length) {
      return (
        <div>
          {t('mainPage.noUsersFound')}
        </div>
      );
    } else if ((loadingStatus === 'idle' && users.length)) {
      return (
        <>
          <div className="userListHeader">
            <div className="emailHeader">{t('mainPage.email')}</div>
            <div className="numberHeader">{t('mainPage.number')}</div>
          </div>
          {users.map((user) => <UserItem user={user} key={user.id} />)}
        </>
      );
    }

  }, [users, loadingStatus]);

  return (
    <div className="mainPageContainer">
      <div className="formAndUserListContainer">
        <form onSubmit={formik.handleSubmit} className="mainPageFormContainer">
          <h1 className="textBoldMax">{t('mainPage.enterEmailAndNumber')}</h1>
          <EmailInput
            valueProp={formik.values.email}
            onChangeProp={formik.handleChange}
            authFailed={formik.errors.email && formik.touched.email}
          />
          <NumberInput
            valueProp={formik.values.number}
            onChangeProp={formik.handleChange}
            authFailed={formik.errors.number && formik.touched.number}
          />
          {formik.errors.email && formik.touched.email && <div
            className="validationError textNormMin"
            >
            <p>*</p>
            <p>{formik.errors.email}</p>
          </div>}
          <SubmitButton />
        </form>
        {loadingStatus === 'loading' && <LoadingSpinner />}
        {true && <div className="userListContainer textBoldMax">
          {serverAnswer}
        </div>}
      </div>
    </div>
  );
};

export default MainPage;
