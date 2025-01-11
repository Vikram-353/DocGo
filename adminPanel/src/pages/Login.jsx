// import React, { useContext, useState } from "react";
// import { assets } from "../assets/assets_admin/assets";
// import { AdminContext } from "../context/AdminContext";
// import axios from "axios";
// import { toast } from "react-toastify";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const { setAtoken, backendUrl } = useContext(AdminContext);
//   const [state, setState] = useState("Admin");

//   const onSubmitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       if (state === "Admin") {
//         const { data } = await axios.post(`${backendUrl}/api/admin/login`, {
//           email,
//           password,
//         });
//         if (data.success) {
//           localStorage.setItem("aToken", data.token);
//           setAtoken(data.token);
//         } else {
//           toast.error(data.message);
//         }
//       } else {
//         const { data } = await axios.post(`${backendUrl}/api/doctor/login`, {
//           email,
//           password,
//         });
//         if (data.success) {
//           console.log(data.token);
//         }
//       }
//     } catch (error) {
//       console.error(
//         "Login failed:",
//         error.response?.data?.message || error.message
//       );
//     }
//   };

//   return (
//     <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
//       <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
//         <p className="text-2xl font-semibold m-auto">
//           <span className="text-primary">{state}</span> Login
//         </p>
//         <div className="w-full">
//           <p>Email</p>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className="border border-[#DADADA] rounded w-full p-2 mt-1"
//             type="email"
//             required
//           />
//         </div>
//         <div className="w-full">
//           <p>Password</p>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             className="border border-[#DADADA] rounded w-full p-2 mt-1"
//             type="password"
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-primary text-white w-full py-2 rounded-md text-base"
//         >
//           Login
//         </button>
//         {state === "Admin" ? (
//           <p>
//             Doctor Login?{" "}
//             <span
//               className="text-primary underline cursor-pointer"
//               onClick={() => setState("Doctor")}
//             >
//               Click here
//             </span>
//           </p>
//         ) : (
//           <p>
//             Admin Login?{" "}
//             <span
//               className="text-primary underline cursor-pointer"
//               onClick={() => setState("Admin")}
//             >
//               Click here
//             </span>
//           </p>
//         )}
//       </div>
//     </form>
//   );
// }

// export default Login;

import React, { useContext, useState } from "react";
import { AdminContext } from "../context/AdminContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setAtoken, backendUrl } = useContext(AdminContext);
  const [state, setState] = useState("Admin");
  const [loading, setLoading] = useState(false);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const endpoint =
        state === "Admin"
          ? `${backendUrl}/api/admin/login`
          : `${backendUrl}/api/doctor/login`;

      const { data } = await axios.post(endpoint, { email, password });

      if (data.success) {
        toast.success("Login successful!");
        if (state === "Admin") {
          localStorage.setItem("atoken", data.token);
          setAtoken(data.token);
        } else {
          console.log(data.token);
        }
      } else {
        toast.error(data.message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message
      );
      toast.error(error.response?.data?.message || "An error occurred.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="min-h-[80vh] flex items-center">
      <div className="flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg">
        <p className="text-2xl font-semibold m-auto">
          <span className="text-primary">{state}</span> Login
        </p>
        <div className="w-full">
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="email"
            required
          />
        </div>
        <div className="w-full">
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded w-full p-2 mt-1"
            type="password"
            required
          />
        </div>
        <button
          type="submit"
          className={`bg-primary text-white w-full py-2 rounded-md text-base ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
        {state === "Admin" ? (
          <p>
            Doctor Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Doctor")}
            >
              Click here
            </span>
          </p>
        ) : (
          <p>
            Admin Login?{" "}
            <span
              className="text-primary underline cursor-pointer"
              onClick={() => setState("Admin")}
            >
              Click here
            </span>
          </p>
        )}
      </div>
    </form>
  );
}

export default Login;
