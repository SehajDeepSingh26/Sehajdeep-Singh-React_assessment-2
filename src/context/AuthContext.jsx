import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")) || null);
    const navigate = useNavigate();

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    const hashPassword = async (password) => {
        const salt = await bcrypt.genSalt(10);
        return await bcrypt.hash(password, salt);
    };

    const signup = async (name, email, password) => {
        const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
        if (existingUsers.some((user) => user.email === email)) {
            return "User already exists";
        }

                                                                            //^ Hash the password before storing
        const hashedPassword = await hashPassword(password);
        const newUser = { name, email, password: hashedPassword };

        localStorage.setItem("users", JSON.stringify([...existingUsers, newUser]));
        setUser(newUser);
        navigate("/");
        return "Signup success";
    };

    const login = async (email, password) => {
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const foundUser = users.find((user) => user.email === email);

        if (foundUser) {
            const isMatch = await bcrypt.compare(password, foundUser.password);
            if (isMatch) {
                setUser(foundUser);
                navigate("/");
                return "Login success";
            }
        }

        return "Invalid credentials";
    };

    const logOut = () => {
        setUser(null);
        navigate("/login");
    };

    return (
        <AuthContext.Provider value={{ user, signup, logOut, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
