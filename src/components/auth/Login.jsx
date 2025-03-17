import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'

const Login = () => {
    const { login } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [message, setMessage] = useState("")

    const handleLogin = (e) => {
        e.preventDefault();
        const response = login(email, password)

        setMessage(response)
    }

    return (
        <div className='flex justify-center items-center h-full mt-20'>
            <div className="bg-white p-8 rounded-lg w-96 mt-20">
                <h2 className="text-2xl font-semibold mb-4">Login</h2>

                <input
                    type="email"
                    placeholder="Email"
                    className="border p-2 w-full mb-2"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="border p-2 w-full mb-2"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button className="bg-blue-500 text-white p-2 w-full rounded-md hover:bg-blue-600" onClick={handleLogin}>
                    LogIn
                </button>
                {message && <p className="text-red-500 mt-2">{message}</p>}
            </div>
        </div>
    )
}

export default Login
