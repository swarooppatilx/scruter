import ImageUpload from '@/components/ui/imageUpload';
import { useGlobalListing } from '@/context/GlobalListingProvider';

const SelectImage = () => {
  const { imageUrl, handleImageChange, handleImageRemove } = useGlobalListing();

  return (
    <div className="h-3/4 flex mb-5 flex-col items-start gap-8 justify-start">
      <h1 className="text-primary-marineBlue font-bold text-[1.6rem] md:text-4xl leading-9">
        Add Images
      </h1>
      <h3 className="text-gray-400 mt-2 ">
        Please add some images for your listing
        <br />
        {/* {imageUrl.map((url)=>(
            <div key={url}>{url}<br/></div>
        ))} */}
      </h3>
      <ImageUpload
        value={imageUrl.map(imageUrl => imageUrl)}
        onChange={handleImageChange}
        onRemove={handleImageRemove}
      />
    </div>
  );
};

export default SelectImage;
