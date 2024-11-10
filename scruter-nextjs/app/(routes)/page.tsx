import ChatBotPage from '@/components/chatbot/chatbotPage';
import HeroCards from '@/components/heroCards';
import { HeroCarousal } from '@/components/heroCarousal';
import PageContainer from '@/components/ui/pageContainer';

const HomePage = () => {
  return (
    <>
      <PageContainer>
        <HeroCarousal />
        <HeroCards />
        <ChatBotPage/>
      </PageContainer>
    </>
  );
};

export default HomePage;
