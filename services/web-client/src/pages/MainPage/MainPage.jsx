import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { fetchUsers, actions } from '../../slices/usersSlice.js';
import SubmitButton from '../../components/SubmitButton/SubmitButton.jsx';
import EmailInput from '../../components/EmailInput/EmailInput.jsx';
import NumberInput from '../../components/NumberInput/NumberInput.jsx';
import LoadingSpinner from '../../components/LoadingSpinner/LoadingSpinner.jsx';
import UserItem from '../../components/UserItem/UserItem.jsx';
import UsersHeader from '../../components/UsersHeader/UsersHeader.jsx';
import './MainPage.css';

const MainPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users.users);
  const loadingStatus = useSelector((state) => state.users.loadingStatus);
  const isInitialState = useSelector((state) => state.users.isInitialState);
 
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
      dispatch(actions.changeInitialState())
      dispatch(actions.removeAllUsers());
      dispatch(fetchUsers({ email, number }));

      formik.values.email = '';
      formik.values.number = '';
    },
  });

  const serverAnswer = useMemo(() => {
    if (!users.length) {
      return (
          <div className="noUsers textNormMiddle">{t('mainPage.noUsersFound')}</div>
      );
    } else {
      return (
        <>
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
        {!isInitialState && loadingStatus === 'idle' && <div className="userListContainer textBoldMax">
          <UsersHeader />
          {serverAnswer}
        </div>}
      </div>
    </div>
  );
};

export default MainPage;
