import React, { useState } from "react";
import { auth } from "@/firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useUser } from "@/context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorSubmit, setErrorSubmit] = useState("");
  const navigate = useNavigate();
  const user = useUser();
  const { toast } = useToast();

  if (user) {
    return <Navigate to="/home" replace />;
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const user = { email, password };

    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const user = userCredential.user;
        toast({
          title: `Welcome, ${user.displayName}`,
          description: "It is always pleasure you be here",
          className: "bg-lime-600 text-white",
        });

        setEmail("");
        setPassword("");
        setErrorSubmit("");
        navigate("/home");
      })
      .catch((error) => {
        if (error.code === "auth/invalid-credential") {
          setErrorSubmit("Invalid Credentials or user doesn't exist");
        }

        console.log(error.code);
      });
  };

  return (
    <main className="container mx-auto pt-24 px-4 h-full">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Login</h1>
        <p className="mt-4 text-base text-center text-gray-500">
          Welcome back! &#128075;
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
        <p className="mb-5 text-red-500 font-medium">{errorSubmit}</p>
        <button
          type="submit"
          className="text-white bg-blue-500 hover:bg-blue-800 focus:ring-4 focus:out-line-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center"
        >
          Submit
        </button>
        <div className="mt-4">
          <p className="text-slate-900 text-center">
            Doesn't have account?{" "}
            <Link to="/register" className="text-blue-500 underline">
              Register now
            </Link>
          </p>
        </div>
      </form>
    </main>
  );
};

export default Login;
