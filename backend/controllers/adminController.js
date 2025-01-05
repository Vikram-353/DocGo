import { v2 as cloudinary } from "cloudinary";
import bcrypt from "bcrypt";
import validator from "validator";
import doctorModel from "../models/doctorModel.js";

const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      password,
      speciality,
      experience,
      about,
      fees,
      degree,
      address,
      image,
    } = req.body;

    const imageFile = req.file;

    // Checking for all data to add doctor
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !speciality ||
      !experience ||
      !about ||
      !fees ||
      !degree ||
      !address ||
      !imageFile
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    // Validating email format
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });
    }

    // Validate password
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be 8 characters" });
    }

    // Encrypting password
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    // Upload image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resource_type: "image",
    });
    const imageURL = imageUpload.secure_url;

    const docData = {
      name,
      email,
      password: hashedpassword,
      phone,
      speciality,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      degree,
      image: imageURL,
    };

    const newDoctor = new doctorModel(docData);
    await newDoctor.save();

    res.status(200).json({ success: true, message: "Doctor Added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export { addDoctor };
