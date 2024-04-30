// for public access
exports.allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

// for loggedin user (user/admin) role
exports.userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

// for admin role
exports.adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};
