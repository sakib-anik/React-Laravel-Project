import { Navigate, Outlet } from "react-router-dom";
import { setStateContext } from "../context/ContextProvider";
export default function GuestLayout() {
    const { token } = setStateContext();
    if (token) {
        return <Navigate to="/" />;
    }
    return (
        <div id="guestLayout">
            <div className="content">
                <header>
                    <div></div>
                    <div></div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
}
