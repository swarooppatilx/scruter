import SellerNavBar from '@/components/common/sellerNavBar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SellerNavBar />
      {children}
    </>
  );
}
