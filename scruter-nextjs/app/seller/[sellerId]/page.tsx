import prismadb from '@/lib/prismadb';
import { Listing } from '@prisma/client';
import SetUpListing from './components/setupListing';
// import SetUpGuide from "./components/setupListing";
// import SellerDashboard from "./components/sellerDashboard";

interface SellerPageProps {
  params: {
    sellerId: string;
  };
}

const SellerPage: React.FC<SellerPageProps> = async ({ params }) => {
  let Listings: Listing[] | null = [];

  const { sellerId } = await params;
  try {
    Listings = await prismadb.listing.findMany({
      where: {
        SellerId: sellerId,
      },
    });
  } catch (err) {
    console.error(
      'Error fetching Listing',
      err instanceof Error ? err.message : err
    );
  }

  if (Listings.length) {
    return (
      <div>
        {Listings.map(listing => (
          <div key={listing.id}>{listing.name}</div>
        ))}
      </div>
    );
  } else {
    return <SetUpListing sellerId={sellerId} />;
  }
};

export default SellerPage;
