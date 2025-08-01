import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import useAxios from '../../../hooks/useAxios';

const DiscountSection = () => {
  const axiosSecure = useAxios();

  const { data: discounted = [], isLoading, isError, error } = useQuery({
    queryKey: ['discountedMedicines'],
    queryFn: async () => {
      const res = await axiosSecure.get('/discounted-medicines');
      return res.data;
    }
  });

  if (isLoading) return <p className="text-center text-lg py-10">Loading discounted medicines...</p>;
  if (isError) return <p className="text-center text-red-500">Error: {error.message}</p>;

  return (
    <div className='my-12 px-6'>
      <h2 className='text-center text-2xl font-bold mb-8'> Discounted Medicines</h2>

      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 }
        }}
      >
        {discounted.map(med => (
          <SwiperSlide key={med._id}>
            <div className='card bg-base-100 shadow-md border'>
              <figure className='h-[250px] overflow-hidden'>
                <img src={med.image} alt={med.name} className="w-full object-cover" />
              </figure>
              <div className='card-body'>
                <h3 className='text-lg font-bold'>{med.name}</h3>
                <p>
                  Price: <s>{med.price} ৳</s> →{' '}
                  <span className='text-green-500 font-semibold'>
                    {(med.price - (med.price * med.discount) / 100).toFixed(2)} ৳
                  </span>
                </p>
                <p className='text-sm text-red-500'>Discount: {med.discount}%</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountSection;

