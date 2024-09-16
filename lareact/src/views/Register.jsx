import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axiosClient";
import { setStateContext } from "../context/ContextProvider";
export default function Register() {
    const nameRef = useRef("");
    const emailRef = useRef("");
    const passwordRef = useRef("");
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const { setUser, setToken } = setStateContext();
    const Submit = (ev) => {
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        axiosClient
            .post("/register", payload)
            .then(({ data }) => {
                setUser(data.user);
                setToken(data.token);
                setName(null);
                setEmail(null);
                setPassword(null);
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status == 422) {
                    if (response.data.errors.name) {
                        setName(response.data.errors.name);
                    } else {
                        setName(null);
                    }
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
                }
            });
    };
    return (
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">Login To Your Account</h1>
                <form onSubmit={Submit}>
                    <input ref={nameRef} type="text" placeholder="Name" />
                    {name && <p style={{ color: "red" }}>{name}</p>}
                    <input ref={emailRef} type="email" placeholder="Email" />
                    {email && <p style={{ color: "red" }}>{email}</p>}
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    {password && <p style={{ color: "red" }}>{password}</p>}
                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already Have An Account? <Link to="/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    );
}
