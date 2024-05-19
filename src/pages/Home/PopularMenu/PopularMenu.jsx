
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import MenuItem from "../../Shared/MenuItem/MenuItem";
import useMenu from "../../../hooks/useMenu";


const PopularMenu = () => {

    const [menu] = useMenu();
    const popular = menu.filter(item => item.category === "popular")
   
    return (
        <section className="mt-10 mb-10">
            <SectionTitle 
            subHeading={"Check it out"}
            heading={"from our menu"}
            >
            </SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-6">
                {
                    popular.map(item => 
                    <MenuItem
                    key={item._id}
                    item={item}
                    ></MenuItem>)
                }
            </div>
            <div className="text-center">
            <button className="btn btn-outline text-black border-t-0  border-l-0  border-b-4 mt-5">View Full Menu</button>
            </div>
            
        </section>
    );
};

export default PopularMenu;