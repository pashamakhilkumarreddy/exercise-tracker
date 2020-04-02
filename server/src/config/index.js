require('dotenv').config();

module.exports = {
  server: {
    port: process.env.PORT,
  },
  jwt: {
    jwtSecret: process.env.JWT_SECRET,
  },
  database: {
    atlasURI: process.env.ATLAS_URI,
  },
};
