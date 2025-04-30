// ensureAuth.js
// This middleware checks if the user is authenticated


module.exports = (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      return res.status(401).json({ message: 'Unauthorized' });
    }
  };
  