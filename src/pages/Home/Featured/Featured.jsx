import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import featured from "../../../assets/home/featured.jpg";
import "./Featured.css"

const Featured = () => {
    return (
        <div className="featured-item bg-fixed text-white bg-opacity-10 pt-8">
            <SectionTitle
             subHeading={"Check it out"}
             heading={"from our menu"}
             ></SectionTitle>
            <div className="md:flex justify-center items-center gap-10 px-10 py-10 md:px-24 md:py-8 ">
                <div>
                    <img src={featured} alt="" />
                </div>
                <div>
                    <p>Aug 20 , 2019</p>
                    <p className="upercase">Where can i get some?</p>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis voluptatum iusto quibusdam autem totam. Ab velit repellendus iste, ratione dicta reprehenderit cumque, amet eveniet nobis debitis id officia itaque cupiditate.</p>
                    <button className="btn btn-outline text-white border-t-0  border-l-0  border-b-4 mt-5">Order Now</button>
                </div>
            </div>
        </div>
    );
};

export default Featured;