"use client";
import React from "react";
import { useState, ChangeEvent, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";

export default function LoginPage() {
  const [buttondisabled, setbuttondisabled] = useState(true);
  const router = useRouter();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    if (user.email.length && user.password.length) {
      setbuttondisabled(false);
    } else {
      setbuttondisabled(true);
    }
    // console.log(buttondisabled);
  }, [user]);
  const [loading, setloading] = useState(false);
  const onLogin = async () => {
    try {
      setloading(true);
      const response = await axios.post("/api/users/login", user);
      console.log(response);
      toast.success("Login sucess");
      router.push("/profile");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };

  const onUpdateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser((user) => ({ ...user, email: e.target.value }));
    console.log(user);
  };

  const onUpdatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser((user) => ({ ...user, password: e.target.value }));
    console.log(user);
  };
  return (
    <div className="text-center p-2 m-3">
      <h1>{loading ? "Processing" : "LogIn Page"}</h1>
      <hr />

      <div>
        <label htmlFor="email">Email :</label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={onUpdateEmail}
          placeholder="email"
          className="text-black p-2 m-3"
        />
      </div>
      <div>
        <label htmlFor="password">Password :</label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={onUpdatePassword}
          placeholder="password"
          className="text-black p-2 m-3"
        />
      </div>
      <div>
        <button
          className="p-2 bg-white text-black rounded mt-3 px-4"
          onClick={onLogin}
          disabled={buttondisabled}
        >
          Login
        </button>
      </div>
      <div className="m-3">
        <Link href="/signup">Sign Up here</Link>
      </div>
    </div>
  );
}
