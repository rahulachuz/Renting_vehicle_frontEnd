import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Hero from "../components/Hero";
import ProductList from "../components/ProductList";
import OurService from "../components/OurService";
import Footer from "../components/Footer";

function Home() {
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      console.log(
        `🟢 Logged-in user on Home page: ${user.name} (${user.role})`
      );
    } else {
      console.log("🔴 No user logged in (Home page)");
    }
  }, [user]);

  // ✅ If user is Admin, redirect to /admin
  if (user?.role === "Admin") {
    return <Navigate to="/admin" />;
  }

  return (
    <>
      <Hero />
      <ProductList />
      <OurService />
      <Footer />
    </>
  );
}

export default Home;
