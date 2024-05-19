import { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Rating } from "@smastrom/react-rating";
import '@smastrom/react-rating/style.css'
import { FaQuoteRight } from "react-icons/fa";

const Testimonial = () => {

    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        fetch('reviews.json')
            .then(res => res.json())
            .then(data => {
                setReviews(data);
            })
    }, []);

    console.log(reviews)
    return (
        <section className="my-20">
            <SectionTitle
                subHeading={"What Out Clients Say"}
                heading={"Testimonials"}>
            </SectionTitle>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {
                    reviews.map(review => <SwiperSlide
                        key={review._id}
                    >
                        <div className="md:mx-32 md:my-20 flex flex-col items-center space-y-4">
                            <Rating
                                style={{ maxWidth: 180 }}
                                value={review.rating}
                                readOnly
                            />
                            <FaQuoteRight className="text-4xl" />
                            <p>{review.details}</p>
                            <h3 className="text-3xl text-orange-400">{review.name}</h3>
                        </div>
                    </SwiperSlide>)
                }



            </Swiper>


        </section>
    );
};

export default Testimonial;