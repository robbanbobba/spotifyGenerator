export const getHashParams = () => {
  const hash = window.location.hash.substring(1);
  const params: { [key: string]: string } = {};
  hash.split('&').forEach(part => {
    const [key, value] = part.split('=');
    params[key] = value;
  });
  return params;
};
