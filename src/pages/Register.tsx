import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase/config";
import { Navigate, useNavigate } from "react-router";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userName, setUserName] = useState("");
  const [errorSubmit, setErrorSubmit] = useState("");
  const user = useUser();

  const navigate = useNavigate();
  const { toast } = useToast();

  if (user) {
    return <Navigate to={"/home"} replace />;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { email, password, userName };

    if (user.password !== confirmPassword) {
      setErrorSubmit("As senhas não conferem!");
    } else {
      createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, { displayName: userName });
        })
        .then(() => {
          toast({
            title: "User created successfully!",
            description: "Enter with your e-mail and password",
            className: "bg-lime-600 text-white",
          });
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          navigate("/home");
        })
        .catch((error) => {
          setErrorSubmit(error);
        });
    }
  };

  return (
    <main className="max-w-screen-xl mx-auto pt-4 px-4 xl:pt-12">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Register
        </h1>
        <p className="mt-4 text-base text-center text-gray-500">
          Enter with your informations e start share your moments with us!
        </p>
      </div>
      <form className="max-w-sm mx-auto mt-12" onSubmit={handleSubmit}>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            placeholder="name@email.com"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="username"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Name
          </label>
          <input
            type="text"
            id="username"
            name="username"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            value={userName}
            required
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Your Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password-confirm"
            className={`block mb-2 text-sm font-medium text-gray-900 ${
              password ? "" : "hidden"
            }`}
          >
            Confirm your password
          </label>
          <input
            type="password"
            id="password-confirm"
            name="password-confirm"
            value={confirmPassword}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 ${
              password ? "" : "hidden"
            }`}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <p className="mb-5 text-red-500 font-medium">{errorSubmit}</p>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:out-line-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center"
        >
          Submit
        </button>
        <div className="mt-4">
          <p className="text-slate-900 text-center">
            Do you already have an account?{" "}
            <Link to="/login" className="text-blue-500 underline">
              Sign in
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
};

export default Register;
