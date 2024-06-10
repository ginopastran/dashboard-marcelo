import { Navigation } from "./_components/navigation";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {
  return (
    <div className="h-full flex dark:bg-[#1F1F1F]">
      <Navigation />
      <main className="h-full w-full flex flex-col bg-secondary-background z-10">
        {children}
      </main>
    </div>
  );
};

export default ProtectedLayout;
