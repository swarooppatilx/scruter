import Link from 'next/link';
import MainNav from '@/components/common/main-nav';
import Container from '../ui/container';
import NavbarActions from './navbar-actions';

export const revalidate = 0;

const Navbar = () => {
  return (
    <div className="border-b">
      <Container>
        <div className="px-4 sm:px-6 lg:px-8 flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-x-2 lg:gap-x-4">
            <p className="font-bold text-2xl sm:text-3xl lg:text-4xl">
              Scruter
            </p>
          </Link>

          {/* Main Navigation */}
          <div className="hidden lg:flex flex-1">
            <MainNav />
          </div>

          {/* Navbar Actions - Responsive alignment */}
          <div className="flex items-center space-x-4 lg:space-x-6">
            <NavbarActions />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
