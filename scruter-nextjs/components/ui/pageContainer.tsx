interface ContainerProps {
  children: React.ReactNode;
}

const PageContainer: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <div className="w-full max-w-screen-2xl ">{children}</div>
    </div>
  );
};

export default PageContainer;
