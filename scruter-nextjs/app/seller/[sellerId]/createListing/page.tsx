
import { CreateListingForm } from "./components/postListingForm";

const ListingPage = () => {
  
  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CreateListingForm/>
      </div>
    </div>
  );
};

export default ListingPage;
