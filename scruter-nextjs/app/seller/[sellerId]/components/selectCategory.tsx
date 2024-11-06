import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ChevronDown } from 'lucide-react';
import { useGlobalListing } from '@/context/GlobalListingProvider';

const SelectCategory = () => {
  const { listingCategory, setListingCategory } = useGlobalListing();

  return (
    <div className="h-3/4 flex  flex-col items-start gap-8 justify-start">
      <h1 className="text-primary-marineBlue font-bold text-[1.6rem] md:text-4xl leading-9">
        Select Category
      </h1>
      <h3 className="text-gray-400 mt-2">
        Please select the most appropriate category for your listing
      </h3>
      <DropdownMenu>
        <DropdownMenuTrigger className="bg-black h-10 text-gray-200 w-full rounded-full flex items-center justify-center">
          {listingCategory || 'Category'} <ChevronDown />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            Select the Category for your listing
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setListingCategory('Housing')}>
            Housing
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setListingCategory('Fooding')}>
            Fooding
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setListingCategory('For_Sale')}>
            For Sale
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SelectCategory;
