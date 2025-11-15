import Header from "@/components/Dashboard/layout/Header";
import Sidebar from "@/components/Dashboard/layout/Sidebar";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen mx-auto w-[1440px]">
      <Sidebar />
      <div className="flex flex-col flex-1 bg-[#F8FBFF]">
        <Header />
        <main className="p-6 bg-[#EEF7FF] h-screen overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
