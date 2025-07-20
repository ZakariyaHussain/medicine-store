import React from 'react';
import Banner from '../../shared/Banner/Banner';
import CategorySection from '../../components/Sections/CategorySection/CategorySection';
import DiscountSection from '../../components/Sections/DiscountSection/DiscountSection';


const Home = () => {
    return (
        
        <div>
            <Banner></Banner>
            <h1>this is the home page</h1>
            <CategorySection></CategorySection>
            <DiscountSection></DiscountSection>
        </div>
    );
};

export default Home;