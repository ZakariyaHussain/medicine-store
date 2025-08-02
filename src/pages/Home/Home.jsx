import React from 'react';
import Banner from '../../shared/Banner/Banner';
import CategorySection from '../../components/Sections/CategorySection/CategorySection';
import DiscountSection from '../../components/Sections/DiscountSection/DiscountSection';
import RecommendedSection from '../../components/Sections/RecommendedSection/RecommendedSection';
import CustomerFeedback from '../../components/Sections/CustomerFeedback/CustomerFeedback';
import RecentlyAdded from '../../components/Sections/RecentlyAdded/RecentlyAdded';


const Home = () => {
    return (
        
        <div>
            <Banner></Banner>
            <CategorySection></CategorySection>
            <DiscountSection></DiscountSection>
            <RecommendedSection></RecommendedSection>
            <RecentlyAdded></RecentlyAdded>
            <CustomerFeedback></CustomerFeedback>
        </div>
    );
};

export default Home;