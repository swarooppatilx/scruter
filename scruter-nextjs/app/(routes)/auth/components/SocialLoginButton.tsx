"use client";
import React from "react";
import { auth, googleProvider, githubProvider, twitterProvider } from "./firebaseConfig";
import { signInWithPopup } from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { toast } from "react-hot-toast";

interface SocialLoginButtonProps {
  roleType: string;
}

const SocialLoginButton: React.FC<SocialLoginButtonProps> = ({ roleType }) => {
  const handleLogin = async (provider: any, providerName: string) => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Handle role-based redirection or other logic based on `roleType`
      if (roleType === "user") {
        // Redirect to user dashboard or homepage
        console.log("Redirecting user to homepage");
      } else if (roleType === "seller") {
        // Redirect to seller-specific page
        console.log("Redirecting seller to dashboard");
      }

      toast.success(`Successfully signed in with ${providerName}!`);
    } catch (error) {
      toast.error(`Failed to sign in with ${providerName}. Please try again.`);
    }
  };

  return (
    <div className="flex p-4 justify-between items-center w-full max-w-md mx-auto border-t border-gray-400 mt-4">
      <div className="flex-1 flex justify-start">
        <button
          onClick={() => handleLogin(githubProvider, "GitHub")}
          className="p-3 bg-gray-800 rounded-full shadow-md hover:bg-gray-600 transition duration-300 ease-in-out"
        >
          <FaGithub size={28} color="white" />
        </button>
      </div>

      <div className="flex-1 flex justify-center">
        <button
          onClick={() => handleLogin(googleProvider, "Google")}
          className="p-3 bg-white rounded-full shadow-md hover:bg-gray-100 transition duration-300 ease-in-out"
        >
          <FcGoogle size={28} />
        </button>
      </div>

      <div className="flex-1 flex justify-end">
        <button
          onClick={() => handleLogin(twitterProvider, "Twitter")}
          className="p-3 bg-gray-800 rounded-full shadow-md hover:bg-gray-600 transition duration-300 ease-in-out"
        >
          <FaXTwitter size={28} color="white" />
        </button>
      </div>
    </div>
  );
};

export default SocialLoginButton;
