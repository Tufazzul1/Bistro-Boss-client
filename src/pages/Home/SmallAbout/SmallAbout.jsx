import img from "../../../assets/home/chef-service.jpg";

const SmallAbout = () => {
    return (
        <div style={{
            backgroundImage: `url(${img})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '500px',  
            width: '100%',
        }} className="flex justify-center items-center bg-fixed">
            <div className="w-3/4 bg-white p-10 text-center">
                <h3 className="text-4xl font-cinzel">Bistro Boss</h3>
                <p>Welcome to <span className="font-cinzel">Bistro Boss</span>, where culinary excellence meets a warm and inviting ambiance. Explore our diverse menu featuring delectable dishes crafted from the finest ingredients. Whether you're planning a romantic dinner, a family gathering, or a special event, our seamless online reservation system ensures your table is ready when you are.</p>
            </div>
        </div>
    );
};

export default SmallAbout;
