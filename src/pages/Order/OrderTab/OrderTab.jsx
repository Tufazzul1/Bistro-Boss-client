// import FoodCard from "../../../components/FoodCard/FoodCard";
// // Import Swiper React components
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/pagination';

// const OrderTab = ({ items }) => {

//     const pagination = {
//         clickable: true,
//         renderBullet: function (index, className) {
//             return '<span class="' + className + '">' + (index + 1) + '</span>';
//         },
//     };
//     return (
//         <div >


//             <Swiper
//                 pagination={pagination}
//                 modules={[Pagination]}
//                 className="mySwiper"
//             >
//                 <SwiperSlide>
//                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                         {
//                             items.map(item =>
//                                 <FoodCard
//                                     key={item._id}
//                                     item={item}
//                                 >
//                                 </FoodCard>)
//                         }
//                     </div>
//                 </SwiperSlide>

//             </Swiper>
//         </div>
//     );
// };

// export default OrderTab;

import React from 'react';
import FoodCard from "../../../components/FoodCard/FoodCard";
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const OrderTab = ({ items }) => {

    const pagination = {
        clickable: true,
        renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
        },
    };

    // Helper function to chunk the items array
    const chunkArray = (array, size) => {
        const result = [];
        for (let i = 0; i < array.length; i += size) {
            result.push(array.slice(i, i + size));
        }
        return result;
    };

    // Chunk the items array into chunks of 6
    const chunks = chunkArray(items, 6);

    return (
        <div>
            <Swiper
                pagination={pagination}
                modules={[Pagination]}
                className="mySwiper"
            >
                {chunks.map((chunk, index) => (
                    <SwiperSlide key={index}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {chunk.map(item => (
                                <FoodCard
                                    key={item._id}
                                    item={item}
                                />
                            ))}
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default OrderTab;
