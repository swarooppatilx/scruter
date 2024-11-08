import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';
import { BookmarkProvider } from '@/context/UserBookmarkProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <BookmarkProvider>
        <Navbar />
        {children}
        <Footer />
      </BookmarkProvider>
    </>
  );
}
