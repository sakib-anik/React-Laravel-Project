import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axiosClient";
export default function UserForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [name, setName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [user, setUser] = useState({
        id: null,
        name: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        if (id) {
            setLoading(true);
            axiosClient
                .get("/user/" + id)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data.user);
                })
                .catch((err) => setLoading(false));
        }
    }, []);

    const Submit = (ev) => {
        ev.preventDefault();
        if (!user.id) {
            axiosClient
                .post("/register", user)
                .then(({ data }) => {
                    navigate("/users");
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
        } else {
            axiosClient
                .put("/user/" + user.id, user)
                .then(({ data }) => {
                    navigate("/users");
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
        }
    };

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        });
    };
    return (
        <>
            {user.id && <h1>Update User: {user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}

                <form onSubmit={Submit}>
                    <input
                        name="name"
                        value={user.name}
                        onChange={handleChange}
                        placeholder="Name"
                    />
                    {name && <p style={{ color: "red" }}>{name}</p>}
                    <input
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                        placeholder="Email"
                    />
                    {email && <p style={{ color: "red" }}>{email}</p>}
                    <input
                        type="password"
                        name="password"
                        onChange={handleChange}
                        placeholder="Password"
                    />
                    {password && <p style={{ color: "red" }}>{password}</p>}
                    <button className="btn">Save</button>
                </form>
            </div>
        </>
    );
}
