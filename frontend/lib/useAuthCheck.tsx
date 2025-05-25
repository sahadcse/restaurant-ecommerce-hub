"use client"

import { useEffect } from "react";
import { useAuth } from "./authContext";
import { useRouter } from "next/navigation";

interface useAuthCheckProps {
    allowRoles?: string[];
    // redirectPath?: string;
}

const useAuthCheck = ({allowRoles}: useAuthCheckProps = {}) => {
    const { user, token } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(!token){
            router.push("/login"); // Redirect to login if no token
            return;
        }
        try{
            const userRole = user?.role;
            if(allowRoles && !allowRoles.includes(userRole || "")){
                if(userRole === "customer"){
                    router.push("/"); // Redirect to homepage if customer
                } else if(userRole === "restaurant"){
                    router.push("/restaurant"); // Redirect to restaurant page if restaurant
                } else if(userRole === "admin"){
                    router.push("/admin"); // Redirect to admin page if admin
                } else {
                    router.push("/"); // Default redirect if role is not recognized
                }
            }
        } catch(err){
            console.error("Error checking user role:", err);
            router.push("/login"); // Redirect to login on error
        }
    }, [token, user, allowRoles, router]);

    return { isAuthenticated: !!token, user };
}
export default useAuthCheck;
    