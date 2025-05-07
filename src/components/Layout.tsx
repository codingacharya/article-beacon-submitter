
import NavBar from "./NavBar";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
