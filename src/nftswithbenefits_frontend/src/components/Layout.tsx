import { Outlet } from "react-router-dom";
import Topbar from "./Topbar";

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      <div className="fixed inset-0 bg-black"></div>
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(168,85,247,0.2),rgba(0,0,0,0))]"></div>
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e5,#0ea5e9)] opacity-20"></div>
        <div className="absolute h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_at_center,transparent_0%,black_100%)]"></div>
      </div>
      <div className="relative z-10">
        <Topbar />
        <main className="flex-1 pt-16">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
