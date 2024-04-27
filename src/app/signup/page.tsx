"use client";
import React, { useEffect } from "react";
import { useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
export default function SignUpPage() {
  const router = useRouter();
  const [buttondisabled, setbuttondisabled] = useState(true);
  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });
  useEffect(() => {
    if (user.email.length && user.username.length && user.password.length) {
      setbuttondisabled(false);
    } else {
      setbuttondisabled(true);
    }
    // console.log(buttondisabled);
  }, [user]);
  const [loading, setloading] = useState(false);
  const onSignUp = async () => {
    try {
      setloading(true);
      const response = await axios.post("/api/users/signup", user);
      console.log(response.data);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setloading(false);
    }
  };
  const onUpdateUsername = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setUser((user) => ({ ...user, username: e.target.value }));
    // console.log(user);
  };
  const onUpdateEmail = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setUser((user) => ({ ...user, email: e.target.value }));
    // console.log(user);
  };
  const onUpdatePassword = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setUser((user) => ({ ...user, password: e.target.value }));
    // console.log(user);
  };
  return (
    <div className="text-center p-2 m-3">
      <h1>{loading ? "Processing" : "SignUp Page"}</h1>
      <hr />
      <div className="">
        <label className=" text-white" htmlFor="username">
          UserName :
        </label>
        <input
          type="text"
          id="username"
          value={user.username}
          onChange={onUpdateUsername}
          placeholder="username "
          className="text-black p-2 m-3"
        />
      </div>
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
          onClick={onSignUp}
          disabled={buttondisabled}
        >
          SignUp
        </button>
      </div>
      <div className="m-3">
        <Link href="/login">Login here</Link>
      </div>
    </div>
  );
}
