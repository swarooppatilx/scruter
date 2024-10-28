import HeroCards from "@/components/heroCards";
import { HeroCarousal } from "@/components/heroCarousal";
import PageContainer from "@/components/ui/pageContainer";
import { Container } from "postcss";

const HomePage = () => {
  return ( 
    <PageContainer>
      <HeroCarousal/>
      <HeroCards/>
    </PageContainer>
   );
}
 
export default HomePage;