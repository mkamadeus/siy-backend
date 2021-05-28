export const parseBearerToken = (bearer: string): string => {
  const jwtToken = bearer.split(' ');
  if (jwtToken.length != 2) throw new Error('Invalid token');

  return jwtToken[1];
};
