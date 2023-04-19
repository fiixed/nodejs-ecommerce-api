export const getTokenFromHeader = (req) => {
  const token = req?.headers?.authorization?.split(" ")[1]; //splits Bearer and token into an array, then grabs the token at [1]
  if (token === undefined) {
    return 'No token found in the header';
  } else {
    return token;
  }
}