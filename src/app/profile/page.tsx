"use client";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { useState } from "react";
import Link from "next/link";
export default function ProfilePage() {
  const [data, setData] = useState("Nothing");
  const router = useRouter();
  async function logOut() {
    try {
      await axios.get("/api/users/logout");
      toast.success("User Logout successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  async function getUserData() {
    try {
      const res = await axios.get("/api/users/me");
      console.log(res);
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  return (
    <div className="text-center d-grid place-content-center ">
      <h1 className="text-3xl m-3">Profile Page</h1>
      <hr></hr>
      <h1 className="m-3">This is profile page</h1>
      <button className="m-5 bg-green-500 p-5 rounded  ">
        {data === "Nothing" ? (
          "Nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </button>
      <button className=" m-5 bg-green-500 p-5 rounded " onClick={logOut}>
        Logout
      </button>
      <button className=" m-5 bg-green-500 p-5 rounded " onClick={getUserData}>
        User Details
      </button>
    </div>
  );
}
