import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { setStateContext } from "../context/ContextProvider";
export default function Login() {
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [msg, setMsg] = useState(null);
    const { setUser, setToken } = setStateContext();
    const Submit = (ev) => {
        ev.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                if (data.status) {
                    setUser(data.user);
                    setToken(data.token);
                } else {
                    setMsg(data.message);
                    setEmail(null);
                    setPassword(null);
                }
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    console.log(response.data.errors);
                    if (response.data.errors.email) {
                        setEmail(response.data.errors.email);
                    } else {
                        setEmail(null);
                    }
                    if (response.data.errors.password) {
                        setPassword(response.data.errors.password);
                    } else {
                        setPassword(null);
                    }
                    setMsg(null);
                }
            });
    };
    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">Login To Your Account</h1>
                <form onSubmit={Submit}>
                    <input ref={emailRef} type="email" placeholder="Email" />
                    {email && <p style={{ color: "red" }}>{email}</p>}
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    {password && <p style={{ color: "red" }}>{password}</p>}
                    {msg && <p style={{ color: "red" }}>{msg}</p>}
                    <button className="btn btn-block">Login</button>
                    <p className="message">
                        Not Registered?{" "}
                        <Link to="/register">Create a new account</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
