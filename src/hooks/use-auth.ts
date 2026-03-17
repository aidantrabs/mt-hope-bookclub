import { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
  type User,
} from "firebase/auth";
import { auth } from "@lib/firebase.ts";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => onAuthStateChanged(auth, (u) => {
    setUser(u);
    setLoading(false);
  }), []);

  const signIn = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err: unknown) {
      const code = (err as { code?: string }).code;
      if (code === "auth/network-request-failed") {
        throw new Error("couldn't connect. check your internet and try again.");
      }
      throw new Error("incorrect email or password.");
    }
  };

  const signOut = () => firebaseSignOut(auth);

  return { user, loading, signIn, signOut };
};
