import { Link, Navigate, Outlet } from "react-router-dom";
import axiosClient from "../axiosClient";
import { setStateContext } from "../context/ContextProvider";
export default function DefaultLayout() {
    const { token, user, setUser, setToken } = setStateContext();
    if (!token) {
        return <Navigate to="/login" />;
    }
    const onLogout = (ev) => {
        ev.preventDefault();
        axiosClient.get("/logout").then(() => {
            setUser(null);
            setToken(null);
        });
    };
    return (
        <div id="defaultLayout">
            <div className="content">
                <header>
                    <div>{user.name}</div>
                    <div>
                        <Link
                            to="/users"
                            style={{ margin: "15px" }}
                            className="btn btn-add"
                        >
                            Users List
                        </Link>
                        <a
                            href="#"
                            onClick={onLogout}
                            className="btn btn-logout"
                        >
                            Logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
