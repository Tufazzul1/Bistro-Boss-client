
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";


const SignUp = () => {

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {createUser} = useAuth();

    const onSubmit = (data) => {
        console.log(data)
        createUser(data.email, data.password)
        .then(result =>{
            const user = result.user;
            console.log(user)
        })
    }


    return (
        <>
            <Helmet>
                <title>Bistro Boss | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center md:w-1/2 lg:text-left">
                        <h1 className="text-5xl font-bold">Sign Up Now!</h1>
                        <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    </div>
                    <div className="card md:w-1/2 max-w-sm shadow-2xl bg-base-100">
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" name="name" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" {...register("email", { required: true })} name="email" placeholder="Email" className="input input-bordered" />
                                {errors.email && <span className="text-red-500">This field is required</span>}
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                {/* input field */}
                                <input
                                    type="password"
                                    {...register("password",
                                        {
                                            minLength: 6,
                                            maxLength: 20,
                                            pattern: /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/
                                        },
                                        { required: true })}
                                    name="password"
                                    placeholder="password"
                                    className="input input-bordered" />
                                {/* validation */}
                                {errors.password?.type === "required" && (
                                    <p className="text-red-500">Password is reguired</p>
                                )}
                                {errors.password?.type === "minLength" && (
                                    <p className="text-red-500">Password must be atLeast 6 charecters</p>
                                )}
                                {errors.password?.type === "maxLength" && (
                                    <p className="text-red-500">Password must be less than 20 charecters</p>
                                )}
                                {errors.password?.type === "pattern" && (
                                    <p className="text-red-500">Password must have one uppercase,one lowercase, one special character and one number</p>
                                )}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                         

                            <div className="form-control mt-6">

                                <input className="btn btn-primary" type="submit" value="Sign Up" />
                            </div>
                        </form>
                        <p className='text-yellow-600 text-center'><small>All Ready Registered ? <Link className='font-bold' to={'/login'}>Go to Login</Link></small></p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;