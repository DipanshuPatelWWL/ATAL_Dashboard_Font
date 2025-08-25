import { Link, Outlet, useLocation } from "react-router-dom";
import logo from '../assets/image/logo.png'
export default function AdminLayout() {
  const location = useLocation();

  const menuItems = [
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/admin/faq" },
    { name: "Category", path: "/admin/category" },
    { name: "Sub-Category", path: "/admin/sub-category" },
    { name: "Product", path: "/admin/product" },
    { name: "Review", path: "/admin/review" },
    { name: "Service", path: "/admin/service" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg p-5">
        {/* <h2 className="text-xl font-bold mb-6"></h2> */}
        <img src={logo} className="w-36 ml-10"/>
        <nav className="space-y-2 text-center text-lg font-semibold mt-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`border-b-1 block px-4 py-2 rounded hover:bg-gray-500 hover:text-white ${
                location.pathname === item.path
                  ? "bg-red-500 text-white"
                  : "text-gray-700"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header (Always Visible) */}
        <header className="bg-white shadow-md px-6 py-5 flex justify-between items-center">
          <h1 className="text-xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 text-xl">Hello, Admin</span>
            <button className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xl">
              Logout
            </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
