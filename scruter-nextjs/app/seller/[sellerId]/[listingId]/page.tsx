import { getSpecificListing } from "@/actions/seller/listing";
import { EditListingForm } from "./components/editListingForm";

type Params = Promise<{ 
  listingId:string,
}> 
const ListingPage = async (props:{
  params:Params
}) => {

  const params = await props.params
  const { listingId } = params; 
  const listingData = await getSpecificListing({ listingId });

  if (!listingData.success || !listingData.data) {
    // Handle error case (e.g., show an error message or redirect)
    return <div>Error fetching listing: {listingData.error}</div>;
  }

  // Assuming listingData.data has a property 'images' that is an array of objects
  const filteredData = {
    ...listingData.data,
    images: listingData.data.images
      .filter((image: any) => typeof image.url === 'string' && image.url.startsWith('http')) // Ensure images are URLs
      .map((image: { url: string }) => image.url), // Extract URLs from the image objects
  };

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <EditListingForm initialData={filteredData} /> {/* Pass filtered data to the form */}
      </div>
    </div>
  );
};

export default ListingPage;
