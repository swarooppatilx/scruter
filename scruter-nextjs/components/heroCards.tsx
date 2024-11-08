import { SendToBack, ShieldQuestion, ShoppingCart } from 'lucide-react';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';

const HeroCards = () => {
  const cardData = [
    {
      title: 'What is Scruter?',
      logo: <ShoppingCart className="h-10 w-10 " />,
      decription:
        "Scruter is a local classifieds and community site designed to bring people together for buying, selling, and exchanging goods and services. With an easy-to-use interface, Scruter connects you with people in your local community, whether you're looking for a specific product, service, or simply to connect with like-minded individuals.",
    },
    {
      title: 'How It Works?',
      logo: <ShieldQuestion className="h-10 w-10 " />,
      decription:
        "Post ads, browse listings, and connect with others in your community. Whether you're looking for food, housing, services, or just want to sell something, Scruter's platform allows seamless interaction between buyers and sellers with a few simple steps.",
    },
    {
      title: 'Get Started now!',
      logo: <SendToBack className="h-10 w-10 " />,
      decription:
        'Creating an account is easy and free. In just a few minutes, you can start posting ads and discover what your community has to offer. Join Scruter today and make buying, selling, or exchanging goods a smooth and hassle-free experience.',
    },
  ];

  //
  return (
    <div className="pt-10">
      <div className="flex items-center  justify-center py-10 px-4 h-full">
        <div className="h-full flex flex-col gap-4 md:grid md:grid-cols-2 lg:gap-10 lg:grid-cols-3 ">
          {cardData.map(card => (
            <Card
              key={card.title}
              className="min-w-[250px] text-center max-w-[350px] shadow-md bg-gray-200 dark:bg-gray-700 "
            >
              <CardHeader>
                <div className="flex gap-2 items-center justify-center">
                  {card.logo}
                  <CardTitle className="text-xl md:text-2xl ml-4 font-bold">
                    {card.title}
                  </CardTitle>
                </div>
                <CardDescription className="text-md text-gray-500 dark:text-gray-200">
                  {card.decription}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroCards;
