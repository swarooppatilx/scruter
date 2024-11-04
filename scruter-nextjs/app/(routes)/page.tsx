import HeroCards from '@/components/heroCards';
import { HeroCarousal } from '@/components/heroCarousal';
import PageContainer from '@/components/ui/pageContainer';

const HomePage = () => {
  return (
    <>
      <PageContainer>
        <HeroCarousal />
        <HeroCards />
      </PageContainer>
    </>
  );
};

export default HomePage;
