import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic"
import useAxiosSecure from "../../../hooks/useAxiosSecure"
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddItems = () => {

    const { register, handleSubmit , reset} = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        console.log(data);
        // iamge upload to image bb and then get an url
        const iamgeFile = { image: data.image[0] }
        const res = await axiosPublic.post(image_hosting_api, iamgeFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            // now send the menu item data to the server with image url 
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.post('/menu', menuItem)
            console.log(menuRes.data);
            if(menuRes.data.insertedId){
                // show success popup
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${data.name} is added successfully`,
                    showConfirmButton: false,
                    timer: 1500
                  });
            } 
        }
        console.log('with image url ', res.data)

    };
    return (
        <div>
            <SectionTitle heading={'add an item'} subHeading={"What's New"}></SectionTitle>
            <form onSubmit={handleSubmit(onSubmit)} className="bg-[#F3F3F3] p-6">
                {/* name */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Recipe name?</span>
                    </div>
                    <input type="text"
                        placeholder="Recipe name"
                        {...register('name', { required: true })}
                        className="input w-full" />

                </label>
                <div className="flex gap-3">
                    {/* category */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Category</span>
                        </div>
                        <select defaultValue={'DEFAULT'}  {...register('category', { required: true })} className="select select-bordered w-full">
                            <option disabled value="DEFAULT" >Select a Category</option>
                            <option value="salad">Salad</option>
                            <option value="pizza">Pizza</option>
                            <option value="soup">Soup</option>
                            <option value="dessert">Dessert</option>
                            <option value="drinks">Drinks</option>

                        </select>
                    </label>
                    {/* price */}
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">Price</span>
                        </div>
                        <input type="number"
                            placeholder="Price"
                            {...register('price', { required: true })}
                            className="input w-full" />

                    </label>
                </div>
                {/* details */}
                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Recipe Details</span>
                    </div>
                    <textarea
                        placeholder="Recipe Details"
                        {...register('recipe', { required: true })}
                        className="textarea h-32" />

                </label>
                <div className="my-4">
                    <input {...register('image', { required: true })} type="file" className="file-input w-full max-w-xs" />
                </div>
                <button className="btn">
                    Add Item <FaUtensils></FaUtensils>
                </button>
            </form>
        </div>
    );
};

export default AddItems;