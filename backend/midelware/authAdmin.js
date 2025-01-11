// import jwt from "jsonwebtoken";

// const authAdmin = async (req, res, next) => {
//   try {
//     const atoken = req.header("Authorization");
//     if (!atoken || !atoken.startsWith("Bearer ")) {
//       return res.status(400).json({ error: "Invalid Authentication" });
//     }
//     const token = atoken.split(" ")[1];
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);
//     if (
//       token_decode.email !== process.env.ADMIN_EMAIL ||
//       token_decode.role !== "Admin"
//     ) {
//       return res.status(400).json({ error: "Invalid Authentication" });
//     }
//     next();
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: error.message });
//   }
// };

import jwt from "jsonwebtoken";

const authAdmin = async (req, res, next) => {
  try {
    const atoken = req.header("Authorization");
    if (!atoken) {
      return res.status(400).json({ error: "Invalid Authentication" });
    }
    const token_decode = jwt.verify(atoken, process.env.JWT_SECRET);
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

// import jwt from "jsonwebtoken";

// const authAdmin = async (req, res, next) => {
//   try {
//     const authHeader = req.header("Authorization");
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res
//         .status(401)
//         .json({ error: "Authorization token is missing or malformed" });
//     }

//     const token = authHeader.split(" ")[1];
//     const token_decode = jwt.verify(token, process.env.JWT_SECRET);

//     // Validate the token payload
//     if (
//       token_decode.email !== process.env.ADMIN_EMAIL ||
//       token_decode.role !== "Admin"
//     ) {
//       return res
//         .status(403)
//         .json({ error: "Access denied: Unauthorized admin" });
//     }

//     req.user = token_decode; // Optional: Attach token payload to the request
//     next();
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: error.message });
//   }
// };

// export default authAdmin;
