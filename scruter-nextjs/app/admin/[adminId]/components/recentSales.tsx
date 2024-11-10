import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Listing {
  name: string;
  email: string;
  avatarSrc: string;
  avatarText: string;
  amount: number;
  listingType: string;
}

const listingsData: Listing[] = [
  {
    name: "Rahul Sethi",
    email: "rahul.sethi@scruter.com",
    avatarSrc: "/avatars/rahul.png",
    avatarText: "RS",
    amount: 45000.0,
    listingType: "Housing - 2 BHK Apartment",
  },
  {
    name: "Ananya Mehta",
    email: "ananya.mehta@scruter.com",
    avatarSrc: "/avatars/ananya.png",
    avatarText: "AM",
    amount: 1500.0,
    listingType: "For Sale - Bicycle",
  },
  {
    name: "Suresh Jain",
    email: "suresh.jain@scruter.com",
    avatarSrc: "/avatars/suresh.png",
    avatarText: "SJ",
    amount: 8500.0,
    listingType: "For Sale - Sofa Set",
  },
  {
    name: "Meera Patel",
    email: "meera.patel@scruter.com",
    avatarSrc: "/avatars/meera.png",
    avatarText: "MP",
    amount: 30000.0,
    listingType: "Housing - 1 BHK Apartment",
  },
  {
    name: "Kunal Verma",
    email: "kunal.verma@scruter.com",
    avatarSrc: "/avatars/kunal.png",
    avatarText: "KV",
    amount: 750.0,
    listingType: "Rental - Room",
  },
];

export function RecentSales() {
  return (
    <div className="space-y-8 flex items-center justify-center flex-col">
      {listingsData.map((listing, index) => (
        <div className="flex items-center w-full lg:w-3/4 bg-gray-200 dark:bg-gray-700 p-2 rounded-xl" key={index}>
          <Avatar className="h-9 w-9">
            <AvatarImage src={listing.avatarSrc} alt={listing.name} />
            <AvatarFallback>{listing.avatarText}</AvatarFallback>
          </Avatar>
          <div className="grid grid-cols-1 gap-2 lg:grid-cols-2">
            <div className="ml-4 space-y-1 p-2 col-span-1">
              <p className="text-sm font-medium leading-none">{listing.name}</p>
              <p className="text-sm text-muted-foreground">{listing.email}</p>
            </div>
            <div className="ml-4 space-y-1 p-2 col-span-1">
              <div className="ml-auto text-sm font-medium">
                +₹{listing.amount.toLocaleString()}
              </div>
              <p className="ml-auto text-sm text-muted-foreground">
                {listing.listingType}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
