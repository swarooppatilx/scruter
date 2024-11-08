import Link from 'next/link';
import Container from '../ui/container';
import NavbarActions from './navbar-actions';

const SellerNavBar = () => {
  return (
    <div className="border-b">
      <Container>
        <div className="relative px-4 sm:px-6 lg:px-8 flex h-16 items-center">
          <Link
            href="/"
            className="ml-4 h-full items-center justify-center flex lg:ml:0 gap-x-2"
          >
            <div className="flex flex-col items-center justify-center">
              <p className="font-bold text-4xl">Scruter</p>
              <div className="tracking-widest">s e l l e r</div>
            </div>
          </Link>
          <NavbarActions />
        </div>
      </Container>
    </div>
  );
};

export default SellerNavBar;
