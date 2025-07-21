import React from 'react';
import Banner from '../../shared/Banner/Banner';
import CategorySection from '../../components/Sections/CategorySection/CategorySection';
import DiscountSection from '../../components/Sections/DiscountSection/DiscountSection';
import RecommendedSection from '../../components/Sections/RecommendedSection/RecommendedSection';


const Home = () => {
    return (
        
        <div>
            <Banner></Banner>
            <h1>this is the home page</h1>
            <CategorySection></CategorySection>
            <DiscountSection></DiscountSection>
            <RecommendedSection></RecommendedSection>
        </div>
    );
};

export default Home;