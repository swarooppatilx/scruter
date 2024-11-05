import prismadb from "@/lib/prismadb";
import SetUpListing from "./components/setupListing";
import ListingsPage from "./components/listingPage/listingPage";
import { ListingWithImages } from "@/actions/seller/listing";
// import SetUpGuide from "./components/setupListing";
// import SellerDashboard from "./components/sellerDashboard";

interface SellerPageProps {
  params: {
    sellerId: string;
  };
}

const SellerPage:React.FC<SellerPageProps> = async({params}) => {

  let Listings: ListingWithImages[] | null = [];

  const { sellerId } = await params;
  try {
    Listings = await prismadb.listing.findMany({
      where: {
        SellerId: sellerId,
      },
      include:{
        images:true
      }
    });
  } catch (err) {
    console.error(
      'Error fetching Listing',
      err instanceof Error ? err.message : err
    );
  }
  // console.log(Listings+"SFeeeeeeeeeeeeeeeeeeeeeeee")
    if (Listings.length){
       return <ListingsPage sellerId={sellerId} listings={Listings}/>
    }
  
    else{
      return <SetUpListing sellerId={sellerId}/>
    }
 
}
 
export default SellerPage;
