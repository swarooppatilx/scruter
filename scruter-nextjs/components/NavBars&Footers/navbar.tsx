import Link from 'next/link';
import MainNav from '@/components/NavBars&Footers/main-nav';
import Container from '../ui/container';

export const revalidate = 0;

const Navbar = async () => {
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link href="/" className="ml-4 h-full items-center justify-center flex lg:ml:0 gap-x-2">
            <p className="font-bold text-4xl">Scruter</p>
          </Link>

          <MainNav />
          {/* <NavbarActions/> */}
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
