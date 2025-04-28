import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorised. Please log in again",
    });
  }

  try {
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decodeToken?.id) {
      req.user = {};
      req.user.id = decodeToken.id;
    } else {
      return res.status(401).json({
        success: false,
        message: "Not authorised. Please log in again",
      });
    }

    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please log in again",
      });
    }
    return res.status(401).json({
      success: false,
      message: "Authenticaton failed: " + error.message,
    });
  }
};

export default userAuth;
