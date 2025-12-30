import React from "react";

const Navbar = () => {
  return (
    <nav className="w-[100vw] h-10 fixed top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-between px-8 py-4 bg-transparent  z-50 border-b border-white/30 rounded-lg animate-fade-in backdrop-blur-md bg-white/20">
      <div className="text-lg font-bold backdrop-blur">Home</div>
      <button className="px-4 py-2 mr-90 rounded font-medium">
        Work
      </button>
      <div className="flex gap-4">
        <button className="px-4 h-8 flex items-center justify-center bg-black text-white hover:bg-blue-700 rounded font-medium">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
