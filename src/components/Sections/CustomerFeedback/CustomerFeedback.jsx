import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Autoplay } from 'swiper/modules';

const CustomerFeedback = () => {
    const [feedbacks, setFeedbacks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/feedback')
            .then(res => setFeedbacks(res.data))
            .catch(err => console.error(err));
    }, []);

    return (
        <div className="my-16 px-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-sky-700">🗣 Customer Feedback</h2>

            <Swiper
                modules={[Pagination, Autoplay]}
                spaceBetween={20}
                slidesPerView={1}
                pagination={{ clickable: true }}
                autoplay={{ delay: 3500 }}
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
            >
                {feedbacks.map(fb => (
                    <SwiperSlide key={fb._id}>
                        <div className="bg-white shadow-md border p-6 rounded-xl h-full flex flex-col grow justify-between">
                            <div className="flex items-center gap-4 mb-4">
                                <img src={fb.photo} alt={fb.name} className="w-12 h-12 rounded-full object-cover" />
                                <div>
                                    <p className="font-semibold">{fb.name}</p>
                                    <p className="text-sm text-gray-500">⭐ {fb.rating} / 5</p>
                                </div>
                            </div>
                            <p className="text-gray-700 italic">"{fb.comment}"</p>
                        </div>
                    </SwiperSlide>
                    // <SwiperSlide key={fb._id}>
                    //     <div className="flex flex-col h-full">
                    //         <div className="bg-white shadow-md border p-6 rounded-xl flex flex-col grow justify-between">
                    //             <div>
                    //                 <p className="text-gray-700 italic mb-4">"{fb.comment}"</p>
                    //                 <p className="font-bold text-lg">{fb.name}</p>
                    //                 <p className="text-sm text-gray-500">{fb.email}</p>
                    //             </div>
                    //             <div className="mt-4 text-yellow-500">⭐⭐⭐⭐⭐</div>
                    //         </div>
                    //     </div>
                    // </SwiperSlide>
                ))}
            </Swiper>


        </div>
    );
};

export default CustomerFeedback;
