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
      address,
      image,
    } = req.body;

    const imageFile = req.file;

    //checking for all data to add doctor
    if (
      !name ||
      !email ||
      !phone ||
      !password ||
      !speciality ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill all the fields" });
    }

    //validating emailf ormate
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter valid email" });
    }

    //validate apssword
    if (password.length < 8) {
      return res
        .status(400)
        .json({ success: false, message: "Password must be 8 characters" });
    }

    //encrypting password

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    //upload image to cloudinary
    const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
      resourse_type,
    });
    const imageURL = imageUpload.secure_url;

    const docData = {
      name,
      email,
      image: imageURL,
      password: hashedpassword,
      phone,
      speciality,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
      degree,
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
