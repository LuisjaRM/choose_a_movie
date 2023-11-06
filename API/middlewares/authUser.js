// Connection require
const { getConnection } = require("../database/connection");

// Services require
const { generateError } = require("../services/generateError");

// Npm require
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  let connection;
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError("User not logged in", 409);
    } else {
      // Check if token is correct
      let tokenInfo;

      try {
        tokenInfo = jwt.verify(authorization, process.env.SECRET_TOKEN);
      } catch {
        throw generateError("Incorrect token", 401);
      }

      connection = await getConnection();

      // Check lastAuthUpdate
      const [user] = await connection.query(
        `
              SELECT lastAuthUpdate
              FROM users
              WHERE id = ?
              `,
        [tokenInfo.id]
      );

      // Transfrom lastAuthUpdate and timestamp to Date format
      const lastAuthUpdate = new Date(user[0].lastAuthUpdate);
      const timestampCreateToken = new Date(tokenInfo.iat * 1000);

      // Check if token is expired
      if (timestampCreateToken < lastAuthUpdate) {
        throw generateError("Expired token", 401);
      }

      // Introduces token info in req
      req.userInfo = tokenInfo;
    }

    next();
  } catch (error) {
    next(error);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = authUser;
