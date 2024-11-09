import Container from '@/components/ui/container';
import ListSellers from './components/listSellers';

const CustomerDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <Container>
        <div className="p-8 bg-[url('/userdashboard.png')] bg-opacity-50 flex flex-col">
          <div className='bg-black text-gray-200 w-fit my-4 bg-opacity-80 rounded-xl p-5'>
            <h1 className="text-6xl font-bold mb-2">
              User Dashboard
            </h1>
            <p>Ready to explore Scruter?</p>
          </div>

          <ListSellers />
        </div>
      </Container>
    </div>
  );
};

export default CustomerDashboard;
