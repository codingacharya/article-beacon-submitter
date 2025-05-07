
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { FileText, BookOpen, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function NavBar() {
  const { toast } = useToast();

  const handleLoginClick = () => {
    toast({
      title: "Login feature",
      description: "Login functionality will be implemented in the next version",
    });
  };

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="journal-container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-journal-blue" />
              <span className="text-xl font-bold text-journal-blue">ArticleBeacon</span>
            </Link>
            <nav className="hidden md:ml-10 md:flex md:space-x-8">
              <NavLink to="/" exact>Home</NavLink>
              <NavLink to="/submit">Submit Article</NavLink>
              <NavLink to="/dashboard">Dashboard</NavLink>
              <NavLink to="/journals">Browse Journals</NavLink>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={handleLoginClick}>
              Login
            </Button>
            <Button onClick={handleLoginClick}>
              Register
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

interface NavLinkProps {
  to: string;
  exact?: boolean;
  children: React.ReactNode;
}

function NavLink({ to, exact = false, children }: NavLinkProps) {
  const match = location.pathname === (exact ? to : location.pathname.startsWith(to));
  
  return (
    <Link
      to={to}
      className={cn(
        "px-3 py-2 text-sm font-medium rounded-md transition",
        match
          ? "text-journal-blue-light bg-journal-gray-light"
          : "text-journal-gray-dark hover:text-journal-blue hover:bg-journal-gray-light"
      )}
    >
      {children}
    </Link>
  );
}
