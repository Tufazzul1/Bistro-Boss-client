
import { Parallax, Background } from 'react-parallax';
const Cover = ({ img, title, subtitle }) => {
    return (
        <Parallax
            blur={{ min: -30, max: 30 }}
            bgImage={img}
            bgImageAlt="the menu"
            strength={-200}
        >
            <div className="hero h-[400px] md:h-[600px]">
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="hero-content text-center text-white px-16 md:px-60 py-10 md:py-24 bg-black bg-opacity-40">
                    <div className="max-w-xl">
                        <h1 className="mb-5 text-5xl font-bold uppercase font-cinzel">{title}</h1>
                        <p className="mb-5 uppercase font-cinzel">{subtitle}</p>
                    </div>
                </div>
            </div>
        </Parallax>


    );
};

export default Cover;

