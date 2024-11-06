import React from 'react';
import FormControl from './formControl';
import { useGlobalListing } from '@/context/GlobalListingProvider';

const ListingDetails = () => {
  const {
    listingName,
    setListingName,
    listingPrice,
    setListingPrice,
    listingDescription,
    setListingDescription,

    validListingName,
    setValidListingName,
    validListingPrice,
    setValidListingPrice,
    validListingDescription,
    setValidListingDescription,
  } = useGlobalListing();

  const setListingNameLogic = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListingName(e.target.value);
    setValidListingName(e.target.value.length >= 1);
  };

  const setListingDescriptionLogic = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setListingDescription(e.target.value);
    setValidListingDescription(e.target.value.length >= 1);
  };

  const setListingPriceLogic = (e: React.ChangeEvent<HTMLInputElement>) => {
    setListingPrice(Number(e.target.value));
    setValidListingPrice(e.target.value.length >= 1);
  };

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-primary-marineBlue font-bold text-[1.6rem] md:text-4xl leading-9">
        Listing Info
      </h1>
      <h3 className="text-gray-400 mt-2">
        Please provide your listing name, description and price
      </h3>

      <div className="flex flex-col gap-5">
        <FormControl
          label={'Listing Title'}
          type={'text'}
          id={'ListingName'}
          placeholder={'Home in Lonavala'}
          onchange={setListingNameLogic}
          value={listingName}
          valid={validListingName}
        />
        <FormControl
          label={'Listing Description'}
          type={'text'}
          id={'ListingDescription'}
          placeholder={'3 BHK home'}
          onchange={setListingDescriptionLogic}
          value={listingDescription}
          valid={validListingDescription}
        />
        <FormControl
          label={'Listing Price'}
          type={'number'}
          id={'ListingPrice'}
          placeholder={'e.g. example@upi'}
          onchange={setListingPriceLogic}
          value={listingPrice.toString()}
          valid={validListingPrice}
        />
      </div>
    </div>
  );
};

export default ListingDetails;
