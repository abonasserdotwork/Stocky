import Header from "../components/sections/dashboard/header.jsx"
import Sidebar from "../components/sections/dashboard/sidebar.jsx"
import { Outlet } from "react-router-dom"

function DashboardLayout() {
    return (
        <div className="grid min-h-screen grid-cols-[154px_minmax(0,1fr)] grid-rows-[54px_minmax(0,1fr)]">
            <Sidebar />
            <Header />
            <main className="min-w-0 bg-page">
                <Outlet />
            </main>
        </div>
    )
}

export default DashboardLayout