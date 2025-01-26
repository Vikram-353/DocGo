import jwt from "jsonwebtoken";
import dotenv from "dotenv";

const authDoctor = async (req, res, next) => {
  try {
    const { dtoken } = req.headers;
    if (!dtoken) {
      return res.status(400).json({ error: "Invalid Authentication" });
    }

    const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET);

    req.body.docId = token_decode.id;
    // if (dtoken_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    //   return res.status(400).json({ error: "Invalid Authentication" });
    // }
    // console.log(adtoken);

    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export default authDoctor;
