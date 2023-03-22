// Ideally we should use try catch with async await to handle all these errors. but we are defining that in error handling
module.exports = theFunc => (req, res, next) => {
    Promise.resolve(theFunc(req,res,next)).catch(next)
}
