import serverUrl from "./serverURL";

const apiPath = `${serverUrl}/api/v1`;

export default {
  getUsersPath: () => [apiPath, 'users'].join('/'),
  mainPagePath: () => '/',
};
