import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { FaCartShopping } from "react-icons/fa6";
import useCart from "../../../hooks/useCart";


const Navbar = () => {
    const { user, logOut } = useAuth();
    // console.log(user, logOut);
    const [cart] = useCart();

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('Logged out successfully');
            })
            .catch(error => console.log('Error during logout:', error));
    }

    const navoptins = <>
        <li><Link to={'/'}>Home</Link></li>
        <li><Link to={'/menu'}>Our Menu</Link></li>
        <li><Link to={'/order/salad'}>Order Menu</Link></li>
        <li><Link to={'/secret'}>Secret</Link></li>
        <li>
            <Link to={'/dashboard/carts'}>
                <button className="btn btn-xs">
                    <FaCartShopping />
                    <div className="badge badge-secondary">+{cart.length}</div>
                </button>
            </Link>
        </li>
        {
            user ?
                <>
                    <li><button onClick={handleLogOut} className="btn btn-ghost btn-sm">Sign Out</button></li>
                </> : <>
                    <li><Link to={'/login'}>Login</Link></li>
                </>
        }
    </>
    return (
        <div className="navbar bg-black text-white bg-opacity-30 fixed z-10 max-w-7xl">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navoptins}
                    </ul>
                </div>
                <Link to={'/'} className="btn btn-ghost text-xl uppercase font-cinzel">
                    <div>
                        <p>Bistro Boss</p>
                        <p className="text-sm">Restaurant</p>
                    </div>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navoptins}
                </ul>
            </div>
            <div className="navbar-end">
                <a className="btn">Button</a>
            </div>
        </div>
    );
};

export default Navbar;