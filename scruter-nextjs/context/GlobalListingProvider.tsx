'use client';
import { PostListing } from '@/actions/seller/listing';
import { Category } from '@prisma/client'; // Ensure this is the correct import for your Category enum
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import toast from 'react-hot-toast';

interface GlobalContextType {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  completed: boolean;
  setCompleted: (completed: boolean) => void;

  listingName: string;
  setListingName: (name: string) => void;
  listingPrice: number;
  setListingPrice: (price: number) => void;
  listingDescription: string;
  setListingDescription: (description: string) => void;
  listingCategory: Category; // Ensure this matches your Category type
  setListingCategory: (category: Category) => void; // Ensure this matches your Category type
  imageUrl: string[];
  setImageUrl: (url: string[]) => void;

  handleImageChange: (url: string) => void;
  handleImageRemove: (url: string) => void;

  validListingName: boolean;
  setValidListingName: (name: boolean) => void;
  validListingPrice: boolean;
  setValidListingPrice: (price: boolean) => void;
  validListingDescription: boolean;
  setValidListingDescription: (description: boolean) => void;
  validListingCategory: boolean;
  setValidListingCategory: (category: boolean) => void;
  validImageUrls: boolean; // New state for image URL validation
  setValidImageUrls: (valid: boolean) => void;

  checkedBox: boolean;
  setCheckedBox: (checkedBox: boolean) => void;

  formCompleted: boolean;
  setFormCompleted: (completed: boolean) => void;

  submitListingForm: (sellerId: string) => Promise<void>; // Define return type for async function
}

export const GlobalListingContext = createContext<
  GlobalContextType | undefined
>(undefined);

export const useGlobalListing = () => {
  const context = useContext(GlobalListingContext);
  if (!context) {
    throw new Error(
      'useGlobalListing must be used within a GlobalListingProvider'
    );
  }
  return context;
};

export const GlobalListingProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  const [listingName, setListingName] = useState('');
  const [listingPrice, setListingPrice] = useState(0);
  const [listingDescription, setListingDescription] = useState('');
  const [listingCategory, setListingCategory] = useState<Category>(
    Category.Housing
  ); // Ensure you set the default correctly

  const [validListingName, setValidListingName] = useState(false);
  const [validListingPrice, setValidListingPrice] = useState(false);
  const [validListingDescription, setValidListingDescription] = useState(false);
  const [validListingCategory, setValidListingCategory] = useState(false);
  const [validImageUrls, setValidImageUrls] = useState(false);

  const [imageUrl, setImageUrl] = useState<string[]>([]);

  const handleImageChange = useCallback((url: string) => {
    setImageUrl(prevUrls => [...prevUrls, url]); // Use the previous state
  }, []);

  const handleImageRemove = useCallback((url: string) => {
    setImageUrl(prevUrls => prevUrls.filter(image => image !== url)); // Use the previous state
  }, []);

  const [checkedBox, setCheckedBox] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);

  const submitListingForm = async (sellerId: string) => {
    // Use the context directly here instead of extracting it
    let allValid = true;

    // Validate each field and update validity states
    if (listingName.trim().length < 1) {
      setValidListingName(false);
      allValid = false;
    } else {
      setValidListingName(true);
    }

    if (listingPrice <= 0) {
      setValidListingPrice(false);
      allValid = false;
    } else {
      setValidListingPrice(true);
    }

    if (listingDescription.trim().length <= 0) {
      setValidListingDescription(false);
      allValid = false;
    } else {
      setValidListingDescription(true);
    }

    // Validation for category can be adjusted based on your needs
    if (!Object.values(Category).includes(listingCategory)) {
      setValidListingCategory(false);
      allValid = false;
    } else {
      setValidListingCategory(true);
    }

    if (imageUrl.length === 0) {
      setValidImageUrls(false); // No image URLs provided
      allValid = false;
    } else {
      setValidImageUrls(true); // At least one image URL is present
    }

    // Check if all fields are valid
    if (allValid) {
      setFormCompleted(true); // Set form completed to true

      // Proceed with the API request or any other logic
      try {
        if (!sellerId) {
          console.log('No seller ID provided');
          return;
        }

        // console.log(listingName,listingCategory,listingDescription,listingPrice,sellerId);
        const response = await PostListing({
          sellerId: sellerId,
          listingData: {
            name: listingName,
            price: listingPrice,
            description: listingDescription,
            category: listingCategory,
            images: imageUrl,
          },
        });

        if (!response.data) {
          console.error('Error submitting listing.');
          return;
        }
        toast.success('Listing submitted successfully:', response.data);
        window.location.pathname = `/seller/${sellerId}`;
      } catch (error) {
        toast.error('Error submitting listing');
      }
    } else {
      toast.error('Listing form is not valid.');
    }
  };

  return (
    <GlobalListingContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        completed,
        setCompleted,

        listingName,
        setListingName,
        listingPrice,
        setListingPrice,
        listingDescription,
        setListingDescription,
        listingCategory,
        setListingCategory,
        imageUrl,
        setImageUrl,
        handleImageChange,
        handleImageRemove,

        validListingName,
        setValidListingName,
        validListingPrice,
        setValidListingPrice,
        validListingDescription,
        setValidListingDescription,
        validListingCategory,
        setValidListingCategory,
        validImageUrls,
        setValidImageUrls,

        submitListingForm,

        checkedBox,
        setCheckedBox,
        formCompleted,
        setFormCompleted,
      }}
    >
      {children}
    </GlobalListingContext.Provider>
  );
};
