import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import routes from '../../const/routes.js';
import './NotFoundPage.css';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className="notFoundPage">
      <h1 className="textBoldMax">{t('notFoundPage.pageNotFound')}</h1>
      <p className="textNormMax">
        {t('notFoundPage.butYouCanGo')}
        <Link className="notFoundUrl textBoldMax" to={routes.mainPagePath()}>
          {` ${t('notFoundPage.toHomePage')}`}
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
