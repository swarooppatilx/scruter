import LazyMap from "@/components/Maps/PinDropInput/LazyMapWithPin";
import { useGlobalListing } from "@/context/GlobalListingProvider";

const MapLocationForm = () => {
  const { listingLat, listingLng, setListingLat, setListingLng } = useGlobalListing()
  return (
    <div>
      <h1 className="text-primary-marineBlue h-3/4 font-bold text-[1.6rem] md:text-4xl leading-9">
        Listing Location
      </h1>
      <h3 className="text-gray-400 mt-2">
        Please drop a pin on the location of your Listing
        {/* {ListingLat},{ListingLng} */}
      </h3>
      {/* <div className="w-full h-2/4"> */}
      <LazyMap
        latitude={listingLat}
        longitude={listingLng}
        setLatitude={(lat: number) => setListingLat(lat)}
        setLongitude={(lng: number) => setListingLng(lng)}
      />
      {/* </div> */}
    </div>
  );
};

export default MapLocationForm;
