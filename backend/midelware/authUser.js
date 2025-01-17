import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const authUser = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res.status(400).json({ error: "Invalid Authentication" });
    }

    const token_decode = jwt.verify(token, process.env.JWT_SECRET);

    req.body.userId = token_decode.id;
    // if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    //   return res.status(400).json({ error: "Invalid Authentication" });
    // }
    // console.log(atoken);

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export default authUser;
