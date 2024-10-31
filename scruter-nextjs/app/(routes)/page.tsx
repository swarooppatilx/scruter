// pages/index.js
import HeroCards from '@/components/heroCards';
import { HeroCarousal } from '@/components/heroCarousal';
import PageContainer from '@/components/ui/pageContainer';

const HomePage = () => {
  return (
    <>
      {/* Include the custom cursor */}
      <PageContainer>
        <HeroCarousal />
        <HeroCards />
      </PageContainer>
    </>
  );
};

export default HomePage;
