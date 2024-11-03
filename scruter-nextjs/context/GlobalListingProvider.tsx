"use client"
import { createContext, ReactNode, useContext, useState } from "react";

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
  listingCategory: string;
  setListingCategory: (category: string) => void;

  validListingName: boolean;
  setValidListingName: (name: boolean) => void;
  validListingPrice: boolean;
  setValidListingPrice: (price: boolean) => void;
  validListingDescription: boolean;
  setValidListingDescription: (description: boolean) => void;
  validListingCategory: boolean;
  setValidListingCategory: (category: boolean) => void;

  checkedBox: boolean;
  setCheckedBox: (checkedBox: boolean) => void;

  formCompleted: boolean;
  setFormCompleted: (completed: boolean) => void;
}

export const GlobalListingContext = createContext<GlobalContextType | undefined>(undefined);

export const useGlobalListing = () => {
  const context = useContext(GlobalListingContext);
  if (!context) {
    throw new Error("useGlobalListing must be used within a GlobalListingProvider");
  }
  return context;
};

export const GlobalListingProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completed, setCompleted] = useState(false);

  const [listingName, setListingName] = useState("");
  const [listingPrice, setListingPrice] = useState(0);
  const [listingDescription, setListingDescription] = useState("");
  const [listingCategory, setListingCategory] = useState("Housing");

  const [validListingName, setValidListingName] = useState(false);
  const [validListingPrice, setValidListingPrice] = useState(false);
  const [validListingDescription, setValidListingDescription] = useState(false);
  const [validListingCategory, setValidListingCategory] = useState(false);

  const [checkedBox, setCheckedBox] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);

  
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

        validListingName,
        setValidListingName,
        validListingPrice,
        setValidListingPrice,
        validListingDescription,
        setValidListingDescription,
        validListingCategory,
        setValidListingCategory,

       
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
