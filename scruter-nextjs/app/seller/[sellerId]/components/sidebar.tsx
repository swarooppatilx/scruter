// import { useGlobalStore } from "@/context/storeContext";
import { useGlobalListing } from '@/context/GlobalListingProvider';
import { data } from './sidebarConstants';

const Sidebar = () => {
  const {
    listingName,
    listingCategory,
    listingPrice,
    listingDescription,
    setValidListingName,
    setValidListingCategory,
    setValidListingPrice,
    setValidListingDescription,
    currentStep,
    setCurrentStep,
    setFormCompleted,
  } = useGlobalListing();

  const changeStep = (id: number) => {
    let allValid = true;

    // Validate each field and update validity states
    if (listingName.trim().length < 1) {
      setValidListingName(false);
      allValid = false;
    } else {
      setValidListingName(true);
    }

    if (listingDescription.trim().length < 1) {
      setValidListingDescription(false);
      allValid = false;
    } else {
      setValidListingDescription(true);
    }

    if (listingPrice < 1) {
      setValidListingPrice(false);
      allValid = false;
    } else {
      setValidListingPrice(true);
    }

    if (listingCategory.trim().length < 1) {
      setValidListingCategory(false);
      allValid = false;
    } else {
      setValidListingCategory(true);
    }

    // Move to the next step only if all fields are valid
    if (allValid) {
      setCurrentStep(id);
    }

    // Reset the form completion status
    setFormCompleted(false);
  };

  return (
    <>
      <aside className="bg-mobile absolute top-0 left-0 right-0 md:relative md:bg-desktop h-[50vh] md:h-full p-8 overflow-hidden md:rounded-xl gap-4 md:gap-0 w-screen md:w-[42.5%] flex flex-row md:flex-col items-start md:justify-start justify-center">
        {data.map((data, index) => {
          const { id, step, title } = data;

          return (
            <div
              key={index}
              className={`flex items-center rounded-lg p-2 space-x-4 leading-4 sm:mb-8 ${currentStep === id ? 'border border-black bg-gray-400 ' : ''}`}
            >
              <div
                onClick={() => changeStep(id)}
                className={`md:w-8 cursor-pointer md:h-8 w-10 h-10 rounded-full flex items-center justify-center font-medium `}
              >
                {id}
              </div>
              <div className="hidden md:block">
                <p className="uppercase font-handlee text-customTeal  text-sm font-medium">
                  {step}
                </p>
                <p className="uppercase font-handlee text-customTeal  font-medium tracking-wider">
                  {title}
                </p>
              </div>
            </div>
          );
        })}
      </aside>
    </>
  );
};

export default Sidebar;
