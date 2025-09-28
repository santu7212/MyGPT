import { User } from "../models/users.model.js";
import jwt from "jsonwebtoken";

const verifyJwt = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.json({
        success: false,
        message: "Not authorized user not found ",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export { verifyJwt };
