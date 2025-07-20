import React from 'react';
import Banner from '../../shared/Banner/Banner';
import CategorySection from '../../components/Sections/CategorySection/CategorySection';


const Home = () => {
    return (
        
        <div>
            <Banner></Banner>
            <h1>this is the home page</h1>
            <CategorySection></CategorySection>
        </div>
    );
};

export default Home;