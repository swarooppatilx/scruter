// pages/index.js
import HeroCards from "@/components/heroCards";
import { HeroCarousal } from "@/components/heroCarousal";
import PageContainer from "@/components/ui/pageContainer";
import CustomCursor from "@/components/ui/CustomCursor"; // Import your custom cursor

const HomePage = () => {
    return (
        <>
            <CustomCursor /> {/* Include the custom cursor */}
            <PageContainer>
                <HeroCarousal />
                <HeroCards />
            </PageContainer>
        </>
    );
}

export default HomePage;
