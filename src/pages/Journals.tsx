
import Layout from "@/components/Layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const journalsData = [
  {
    id: "jcs-001",
    title: "Journal of Computational Climate Science",
    publisher: "Global Climate Research Association",
    impactFactor: 4.5,
    categories: ["Climate Science", "Computer Science"],
    description: "Focuses on computational methods and models for climate research and prediction.",
    peerReviewed: true,
    openAccess: true,
  },
  {
    id: "ups-002",
    title: "Urban Planning & Sustainability",
    publisher: "International Urban Development Institute",
    impactFactor: 3.2,
    categories: ["Urban Studies", "Environmental Science"],
    description: "Research on sustainable urban development, planning, and environmental impacts.",
    peerReviewed: true,
    openAccess: false,
  },
  {
    id: "qsm-003",
    title: "Quantum Systems in Medicine",
    publisher: "Advanced Medical Research Foundation",
    impactFactor: 5.8,
    categories: ["Medicine", "Quantum Physics"],
    description: "Explores applications of quantum computing and quantum systems in medical research.",
    peerReviewed: true,
    openAccess: true,
  },
  {
    id: "epr-004",
    title: "Energy Policy Review",
    publisher: "International Energy Association",
    impactFactor: 3.9,
    categories: ["Energy", "Policy Studies"],
    description: "Analysis and evaluation of energy policies and their socioeconomic impacts.",
    peerReviewed: true,
    openAccess: true,
  },
  {
    id: "dht-005",
    title: "Digital Health Technologies",
    publisher: "Healthcare Innovation Institute",
    impactFactor: 4.7,
    categories: ["Health Informatics", "Computer Science"],
    description: "Research on digital technologies for healthcare delivery and management.",
    peerReviewed: true,
    openAccess: false,
  },
  {
    id: "nar-006",
    title: "Neuroscience & Artificial Intelligence Review",
    publisher: "Cognitive Science Foundation",
    impactFactor: 6.2,
    categories: ["Neuroscience", "Artificial Intelligence"],
    description: "Intersection of neuroscience research and artificial intelligence applications.",
    peerReviewed: true,
    openAccess: true,
  },
];

const Journals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [accessFilter, setAccessFilter] = useState("");

  // Filter journals based on search term and filters
  const filteredJournals = journalsData.filter((journal) => {
    const matchesSearch = 
      journal.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
      journal.description.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesCategory = categoryFilter === "" || 
      journal.categories.some(cat => cat.toLowerCase().includes(categoryFilter.toLowerCase()));
      
    const matchesAccess = accessFilter === "" || 
      (accessFilter === "open-access" && journal.openAccess) ||
      (accessFilter === "subscription" && !journal.openAccess);
      
    return matchesSearch && matchesCategory && matchesAccess;
  });

  // Get unique categories for filter dropdown
  const allCategories = Array.from(
    new Set(journalsData.flatMap(journal => journal.categories))
  ).sort();

  return (
    <Layout>
      <div className="journal-container py-10">
        <h1 className="page-title">Browse Journals</h1>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search journals by name or description"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Categories</SelectItem>
                {allCategories.map((category) => (
                  <SelectItem key={category} value={category.toLowerCase()}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Select value={accessFilter} onValueChange={setAccessFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="Filter by access" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">All Access Types</SelectItem>
                <SelectItem value="open-access">Open Access</SelectItem>
                <SelectItem value="subscription">Subscription</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Results Count */}
        <p className="text-gray-500 mb-6">
          Showing {filteredJournals.length} of {journalsData.length} journals
        </p>
        
        {/* Journals List */}
        <div className="space-y-6">
          {filteredJournals.length > 0 ? (
            filteredJournals.map((journal) => (
              <JournalCard key={journal.id} journal={journal} />
            ))
          ) : (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No journals found</h3>
              <p className="text-gray-500 mb-6">
                Try adjusting your search terms or filters
              </p>
              <Button onClick={() => {
                setSearchTerm("");
                setCategoryFilter("");
                setAccessFilter("");
              }}>
                Clear All Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

interface JournalProps {
  journal: {
    id: string;
    title: string;
    publisher: string;
    impactFactor: number;
    categories: string[];
    description: string;
    peerReviewed: boolean;
    openAccess: boolean;
  };
}

const JournalCard = ({ journal }: JournalProps) => {
  return (
    <Card className="overflow-hidden border-gray-200 hover:shadow-md transition">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          <div className="bg-journal-blue p-6 text-white flex items-center justify-center md:w-32">
            <div className="text-center">
              <BookOpen className="h-8 w-8 mx-auto mb-2" />
              <div className="text-xs uppercase tracking-wide">Impact Factor</div>
              <div className="text-2xl font-bold">{journal.impactFactor.toFixed(1)}</div>
            </div>
          </div>
          
          <div className="flex-grow p-6">
            <h2 className="text-xl font-semibold text-journal-blue mb-1">
              {journal.title}
            </h2>
            <div className="text-sm text-gray-600 mb-3">
              Published by: {journal.publisher}
            </div>
            
            <p className="text-gray-700 mb-4">
              {journal.description}
            </p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {journal.categories.map((category) => (
                <Badge key={category} variant="outline" className="bg-gray-50">
                  {category}
                </Badge>
              ))}
              
              {journal.peerReviewed && (
                <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                  Peer Reviewed
                </Badge>
              )}
              
              {journal.openAccess ? (
                <Badge className="bg-green-100 text-green-800 border-green-200">
                  Open Access
                </Badge>
              ) : (
                <Badge className="bg-orange-100 text-orange-800 border-orange-200">
                  Subscription
                </Badge>
              )}
            </div>
            
            <div className="flex justify-end">
              <Button asChild>
                <Link to={`/journals/${journal.id}`} className="flex items-center">
                  Submit to this Journal
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Journals;
