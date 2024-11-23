const { HttpStatus } = require("../utils/constants");

class HttpException extends Error {
    constructor(statusCode, message, error = '') {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.error = error;
        // this.timestamp = new Date().toISOString();
    }
}

const TypeExceptions = {
    NotFoundCommonFunction: (message) => {
        return new HttpException(HttpStatus.NOT_FOUND, message, "Not Found");
    },

    BadReqCommonFunction: (message) => {
        return new HttpException(HttpStatus.BAD_REQUEST, message, "Bad Request");
    },

    AlreadyExistsCommonFunction: (message) => {
        return new HttpException(HttpStatus.BAD_REQUEST, message, "Already Exists");
    },

    InvalidFile: () => {
        return new HttpException(HttpStatus.BAD_REQUEST, "Uploaded file is invalid", "InvalidFile");
    },

    Unauthorized: (message) => {
        return new HttpException(HttpStatus.UNAUTHORIZED, message, "Unauthorized");
    },

    UnknownError: (message) => {
        return new HttpException(HttpStatus.BAD_GATEWAY, message, "Unknown Error");
    },
};

module.exports = {
    HttpException,
    TypeExceptions,
};
