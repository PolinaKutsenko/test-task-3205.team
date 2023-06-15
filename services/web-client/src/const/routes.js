const apiPath = 'api/v1';

export default {
  getUsersPath: () => [apiPath, 'login'].join('/'),
  mainPagePath: () => '/',
};
