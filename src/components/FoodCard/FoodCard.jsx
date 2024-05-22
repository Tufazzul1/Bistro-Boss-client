import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";


const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart()

    const handleAddToCart = () => {
        if (user && user?.email) {
            // send cart item to the database
            const cartItem = {
                menuId: _id,
                email: user?.email,
                name,
                image,
                price
            }

            axiosSecure.post("/carts", cartItem)
                .then(res => {
                    console.log(res.data)
                    if (res.data.insertedId) {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: `${name} added to your cart`,
                            showConfirmButton: false,
                            timer: 1500
                        });

                        // refetch cart to update the cart itams count
                        refetch()
                    }
                })
        }
        else {
            Swal.fire({
                title: "You are not loggedIn",
                text: "Please login to add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    // send the user to the login page
                    navigate('/login', { state: { from: location } })
                }
            });
        }

    }
    return (
        <div className="card shadow-xl mt-16">
            <figure>
                <img src={image} />
            </figure>
            <p className="bg-slate-900 text-white absolute right-0 mr-8 mt-4 px-3">${price}</p>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions">
                    <button onClick={handleAddToCart} className="btn btn-outline text-yellow-700 border-t-0 uppercase  border-l-0  border-b-4 mt-5 bg-gray-200">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;