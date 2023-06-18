export default (numberStr: string | undefined) :string => {
  if (numberStr) {
    return numberStr.replace(/[-]/g, '');
  }
  return '';
};