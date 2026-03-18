import { auth } from "@lib/firebase.ts";
import { signOut as firebaseSignOut, onAuthStateChanged, signInWithEmailAndPassword, type User } from "firebase/auth";
import { useEffect, useState } from "react";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(
        () =>
            onAuthStateChanged(auth, (u) => {
                setUser(u);
                setLoading(false);
            }),
        [],
    );

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
