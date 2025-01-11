import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets_admin/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";

function AddDoctor() {
  const [docImg, setDocImg] = useState(false);
  const [docName, setDocName] = useState("");
  const [docEmail, setDocEmail] = useState("");
  const [docPassword, setDocPassword] = useState("");
  const [phone, setDocPhone] = useState(0);
  const [docExperience, setDocExperience] = useState("1 Year");
  const [docFees, setDocFees] = useState("");
  const [docSpeciality, setDocSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [docAbout, setDocAbout] = useState("");
  const { backendUrl, atoken } = useContext(AdminContext);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      if (!docImg) {
        return toast.error("Please upload doctor image");
      }

      // const currentDate = new Date().toISOString().split("T")[0];

      const formData = new FormData();
      formData.append("name", docName);
      formData.append("email", docEmail);
      formData.append("phone", phone);
      formData.append("password", docPassword);
      formData.append("speciality", docSpeciality);
      formData.append("experience", docExperience);
      formData.append("about", docAbout);
      formData.append("fees", Number(docFees));
      formData.append("degree", degree);
      formData.append(
        "address",
        JSON.stringify({ line1: address1.trim(), line2: address2.trim() })
      );

      formData.append("image", docImg);
      // formData.append("date", currentDate); // Append the current date
      console.log(atoken);

      formData.forEach((value, key) => {
        console.log(`${key}: ${value}`);
      });

      const { data } = await axios.post(
        `${backendUrl}/api/admin/addDoctor`,
        formData,
        { headers: { atoken } }
      );
      if (data.success) {
        toast.success(data.message);
        setDocImg(false);
        setDocName("");
        setDocEmail("");
        setDocPassword("");
        setDocPhone(0);
        setDocExperience("");
        setDocFees("");
        setDocSpeciality("");
        setDegree("");
        setAddress1("");
        setAddress2("");
        setDocAbout("");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // const onSubmitHandler = async (e) => {
  //   e.preventDefault();

  //   try {
  //     if (!docImg) {
  //       return toast.error("Please upload doctor image");
  //     }
  //     const formData = new FormData();
  //     formData.append("image", docImg);
  //     formData.append("name", docName);
  //     formData.append("email", docEmail);
  //     formData.append("password", docPassword);
  //     // formData.append("phone", phone);
  //     formData.append("experience", docExperience);
  //     formData.append("fees", Number(docFees));
  //     formData.append("speciality", docSpeciality);
  //     formData.append("degree", degree);
  //     formData.append(
  //       "address",
  //       JSON.stringify({ line1: address1, line2: address2 })
  //     );
  //     formData.append("about", docAbout);

  //     formData.forEach((value, key) => {
  //       console.log(`${key} ${value}`);
  //     });

  //     const { data } = await axios.post(
  //       `${backendUrl}/api/admin/addDoctor`,
  //       formData,
  //       { headers: { atoken } }
  //     );
  //     if (data.success) {
  //       toast.success(data.message);
  //     } else {
  //       toast.error(data.message);
  //     }
  //   } catch (error) {}
  // };

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full " action="">
      <p className="m-3 text-lg font font-medium ">Add Doctor</p>
      <div className="bg-white px-8 py-8 border rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt=""
            />
          </label>
          <input
            onChange={(e) => setDocImg(e.target.files[0])}
            className="border  w-full  rounded py-2 px-3"
            type="file"
            id="doc-img"
            hidden
          />
          <p>
            Upload doctor <br />
            picture
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div>
              <p>Doctor name</p>
              <input
                onChange={(e) => setDocName(e.target.value)}
                value={docName}
                className="border  w-full  rounded py-2 px-3"
                type="text"
                placeholder="Name"
                required
              />
            </div>

            <div className="flex-1 flex-col gap-1">
              <p>Doctor Email</p>
              <input
                onChange={(e) => setDocEmail(e.target.value)}
                value={docEmail}
                className="border  w-full  rounded py-2 px-3"
                type="email"
                placeholder="Email"
                required
              />
            </div>

            <div className="flex-1 flex-col gap-1">
              <p>Doctor Password</p>
              <input
                onChange={(e) => setDocPassword(e.target.value)}
                value={docPassword}
                className="border  w-full  rounded py-2 px-3"
                type="password"
                placeholder="Password"
                required
              />
            </div>
            <div className="flex-1 flex-col gap-1">
              <p>Doctor Phone</p>
              <input
                onChange={(e) => setDocPhone(e.target.value)}
                value={phone}
                className="border  w-full  rounded py-2 px-3"
                type="number"
                placeholder="Phone"
                required
              />
            </div>

            <div className="flex-1 flex-col gap-1">
              <p>Experience</p>
              <select
                onChange={(e) => setDocExperience(e.target.value)}
                value={docExperience}
                className="border  w-full  rounded py-2 px-3"
                name=""
                id=""
              >
                <option value="1 Year">1 Year</option>
                <option value="2 Year">2 Year</option>
                <option value="3 Year">3 Year</option>
                <option value="4 Year">4 Year</option>
                <option value="5 Year">5 Year</option>
                <option value="6 Year">6 Year</option>
                <option value="7 Year">7 Year</option>
                <option value="8 Year">8 Year</option>
                <option value="9 Year">9 Year</option>
                <option value="10 Year">10 Year</option>
              </select>
            </div>

            <div className="flex-1 flex-col gap-1">
              <p>Fees</p>
              <input
                onChange={(e) => setDocFees(e.target.value)}
                value={docFees}
                className="border  w-full  rounded py-2 px-3"
                type="number"
                placeholder="Fees"
                required
              />
            </div>
          </div>

          <div className="w-full lg:flex-1 flex flex-col gap-4">
            <div className="flex-1 flex-col gap-1">
              <p>Speciality</p>
              <select
                onChange={(e) => setDocSpeciality(e.target.value)}
                value={docSpeciality}
                className="border  w-full  rounded py-2 px-3"
                name=""
                id=""
              >
                <option value="General physician">General physician</option>
                <option value="Gynecologist">Gynecologist</option>
                <option value="Dermatologist">Dermatologist</option>
                <option value="Pediatrictians">Pediatrictians</option>
                <option value="Neurologist">Neurologist</option>
                <option value="Gastroenterologist">Gastroenterologist</option>
              </select>
            </div>

            <div className="flex-1 flex-col gap-1">
              <p>Education</p>
              <input
                onChange={(e) => setDegree(e.target.value)}
                value={degree}
                className="border  w-full  rounded py-2 px-3"
                type="text"
                placeholder="Education"
                required
              />
            </div>

            <div className="flex-1 flex-col gap-1">
              <p>Address</p>
              <input
                onChange={(e) => setAddress1(e.target.value)}
                value={address1}
                className="border  w-full  rounded py-2 px-3"
                type="text"
                placeholder="address 1"
                required
              />
              <input
                onChange={(e) => setAddress2(e.target.value)}
                value={address2}
                className="border w-full rounded py-2 px-3"
                type="text"
                placeholder="address 2"
                required
              />
            </div>

            <div>
              <p className="mb-2 mt-4">About Doctor</p>
              <textarea
                onChange={(e) => setDocAbout(e.target.value)}
                value={docAbout}
                className="w-full px-4 pt-2 border rounded"
                type="text"
                placeholder="write about doctor"
                required
                rows={5}
              ></textarea>
            </div>
          </div>
        </div>
        <button
          type="submit"
          className="bg-primary px-10 py-3 mt-4 text-white rounded-full"
        >
          Add Doctor
        </button>
      </div>
    </form>
  );
}

export default AddDoctor;
