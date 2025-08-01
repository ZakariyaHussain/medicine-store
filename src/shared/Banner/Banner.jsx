import React from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { Carousel } from 'react-responsive-carousel'; // Or use your preferred slider
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const Banner = () => {
  const axiosSecure = useAxiosSecure();
  const { data: banners = [] } = useQuery({
    queryKey: ['homeBanners'],
    queryFn: async () => {
      const res = await axiosSecure.get('/advertisements/home');
      return res.data;
    }
  });

  if (!banners.length) return <p className="text-center">No banners added yet.</p>;

  return (
    <Carousel autoPlay infiniteLoop showThumbs={false}>
      {banners.map(banner => (
        <div key={banner._id}>
          <img src={banner.image} alt={banner.name} />
          <p className="legend">{banner.name}</p>
        </div>
      ))}
    </Carousel>
  );
};

export default Banner;
