export = {
  jwt: {
    secret: String(process.env.APP_JWT_SECRET),
    signOptions: {
      expiresIn: Number(process.env.APP_JWT_EXPIRES_IN),
    },
  },
};
