import { StatusCodes } from "http-status-codes";
import { WHITELIST_DOMAINS } from "../utils/constants.js";
import { errors } from "../utils/logger.js";

const corsOptions = {
  origin: function (origin, callback) {
    // Cho phép request không có origin (như từ Postman)
    if (!origin) return callback(null, true);
    if (WHITELIST_DOMAINS.includes(origin)) {
      callback(null, true);
    }
    return callback(
      new errors(
        StatusCodes.FORBIDDEN,
        `🚫 Origin ${origin} not allowed by CORS.`
      )
    );
  },
  optionsSuccessStatus: 200,
  // Allow credentials to
  credentials: true,
};

export default corsOptions;
