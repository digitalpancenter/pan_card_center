const adminMiddleware = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next(); // admin hai, access do
  } else {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }
};

module.exports = adminMiddleware;
