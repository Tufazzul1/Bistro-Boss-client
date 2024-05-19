import { Link } from "react-router-dom";
import Cover from "../../Shared/Cover/Cover";
import MenuItem from "../../Shared/MenuItem/MenuItem";


const MenuCategory = ({ items, title, subtitle, img }) => {
    return (
        <div>
            {
                title && <Cover
                    img={img}
                    title={title}
                    subtitle={subtitle}
                ></Cover>
            }
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6 mt-16">
                {
                    items.map(item =>
                        <MenuItem
                            key={item._id}
                            item={item}
                        ></MenuItem>)
                }
            </div>
            <div className="text-center mb-10">
                <Link to={`/order/${title}`}>
                    <button className="btn btn-outline text-black border-t-0 uppercase border-l-0  border-b-4 mt-5">Order Your Favourite Food</button></Link>
            </div>
        </div>
    );
};

export default MenuCategory;