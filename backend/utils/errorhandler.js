//In product controller.js we are writting many logic nad if else condition. To avoid this if else condition message big code we can use error handler
class ErrorHandler extends Error{
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode

        Error.captureStackTrace(this, this.constructor)
    }
}
module.exports = ErrorHandler
