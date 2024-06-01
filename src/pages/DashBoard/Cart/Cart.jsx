import { FaTrashAlt } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import useCart from "../../../hooks/useCart";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { Link } from "react-router-dom";


const Cart = () => {
    const [cart, refetch] = useCart();
    const totalPrice = cart.reduce((total, item) => total + item.price, 0)
    const totalPriceInt = parseInt(totalPrice);
    const axiosSecure = useAxiosSecure()


    const handleDelete = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })

            }
        });
    }
    return (
        <div>
            <SectionTitle heading={"Wanna Add More ?"} subHeading={"My Cart"} ></SectionTitle>
            <div className="flex justify-around">
                <h2 className="text-3xl uppercase font-cinzel font-bold">Total Orders : {cart.length}</h2>
                <h2 className="text-3xl uppercase font-cinzel font-bold">Total Price : ${totalPriceInt}</h2>
                {cart.length ?<Link to={'/dashboard/payment'}>
                    <button className="btn bg-[#D1A054] text-white">Pay</button>
                </Link>:
                <button disabled className="btn btn-primary"Pay></button>}
            </div>
            <div className="overflow-x-auto mt-6">
                <table className="table">
                    {/* head */}
                    <thead className="text-white bg-[#D1A054] rounded-t-xl">
                        <tr>
                            <th>#</th>
                            <th>Item Image</th>
                            <th>Item Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            cart.map((item, index) => <tr key={item._id}>
                                <th>
                                    {index + 1}
                                </th>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={item.image} alt="Avatar Tailwind CSS Component" />
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5>{item.name}</h5>
                                </td>
                                <td>${item.price}</td>
                                <th>
                                    <button onClick={() => { handleDelete(item._id) }} className="btn bg-red-500 p-2 text-white"><FaTrashAlt></FaTrashAlt></button>
                                </th>
                            </tr>)
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Cart;