

const FoodCard = ({item}) => {
    const { name, image, price, recipe } = item
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
                <button className="btn btn-outline text-yellow-700 border-t-0 uppercase  border-l-0  border-b-4 mt-5 bg-gray-200">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;