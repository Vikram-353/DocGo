import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const atoken = req.header("Authorization");
    if (!atoken) {
      return res.status(400).json({ error: "Invalid Authentication" });
    }
    const token_decode = jwt.verify(atoken, process.env.JWD_SECRET);
    if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
      return res.status(400).json({ error: "Invalid Authentication" });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export default authAdmin;
