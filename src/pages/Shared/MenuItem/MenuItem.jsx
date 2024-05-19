

const MenuItem = ({ item }) => {
    const { name, image, price, recipe } = item;
    return (
        <div className="flex space-x-4 p-4">
            <img style={{borderRadius: '0 200px 200px 200px'}} className="w-[100px]" src={image} alt="" />
            <div>
                <h4 className="uppercase">{name}----------</h4>
                <h4 className="text-xs">{recipe}</h4>
                
            </div>
            <h1 className="text-yellow-600">${price}</h1>
        </div>
    );
};

export default MenuItem;