import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import useAxios from '../../../hooks/useAxios';

const CustomerFeedback = () => {
    const axiosSecure = useAxios();

    const { data: feedbacks = [], isLoading, isError, error } = useQuery({
        queryKey: ['customerFeedback'],
        queryFn: async () => {
            const res = await axiosSecure.get('/feedback');
            return res.data;
        }
    });

    if (isLoading) return <p className="text-center py-8 text-lg">Loading customer feedback...</p>;
    if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;

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
                ))}
            </Swiper>
        </div>
    );
};

export default CustomerFeedback;
