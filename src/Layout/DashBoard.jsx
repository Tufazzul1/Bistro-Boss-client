import { FaHome, FaSearch, FaShoppingCart } from "react-icons/fa";
import { FaCalendar, FaList } from "react-icons/fa6";
import { MdRateReview } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";


const DashBoard = () => {
    const [cart] = useCart();
    return (
        // side bar
        <div className="flex ">
            <div className="w-64 min-h-screen bg-[#D1A054]">
                <div className="text-center mt-10">
                    <h2 className="text-3xl font-cinzel font-bold">Bistro Boss</h2>
                    <h4 className="text-xl font-cinzel">Restaurant</h4>
                </div>
                <ul className="menu mt-5">
                    <li>
                        <NavLink to={'/dashboard/userHome'}>
                            <FaHome></FaHome>
                            User Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/reservation'}>
                            <FaCalendar></FaCalendar>
                            Reservation</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/cart'}>
                            <FaShoppingCart></FaShoppingCart>
                            My Cart ({cart.length})</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/review'}>
                            <MdRateReview />
                            Add Review</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/dashboard/bookings'}>
                            <FaList />
                            Bookings</NavLink>
                    </li>
                    <div className="divider"></div>
                    <li>
                        <NavLink to={'/'}>
                            <FaHome></FaHome>
                            Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={'/order/salad'}>
                            <FaSearch></FaSearch>
                            Menu</NavLink>
                    </li>

                </ul>
            </div>\
            {/* dashBoard content */}
            <div className="flex-1 p-8">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default DashBoard;