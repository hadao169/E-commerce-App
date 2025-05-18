Learning react-hook-form, zod to validate:

Front-end validation:

- Using 'resolver' to connect validation libraries to react-hook-form (not have to manually validate schema)
- using 'refine' to custom validation logic (compare password, confirmPassword)

Back-end validation:

- Using 'validator' to validate user input
- Using 'bcrypt' to hash password
- Using 'jwt' to generate access token and refresh token
- Using 'passport' to authenticate user (jwt strategy)
- Invalidate token when user logs out or changes password:
  - Increment tokenVersion in user model
  - Check tokenVersion in JWT strategy
- With passport, extracting bearer token from header and adding user to request object is handled in passport.js. It checks if token is expired and if it is, it returns 401 error.
- Token is generated and expires and then refresh token is generated and used to generate new access token.
