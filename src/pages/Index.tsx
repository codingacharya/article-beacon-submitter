
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, FileText, Search, Upload } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/Layout";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-journal-blue to-journal-blue-light text-white py-16">
        <div className="journal-container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 animate-fade-in">
              Welcome to ArticleBeacon
            </h1>
            <p className="text-lg mb-8 opacity-90">
              The premier platform for academic research submission, review, and publication.
              Elevate your research impact with our global network of journals and researchers.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-journal-blue hover:bg-gray-100">
                <Link to="/submit">Submit Your Research</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                <Link to="/journals">Browse Journals</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-journal-gray-light">
        <div className="journal-container">
          <h2 className="text-3xl font-bold text-center mb-12 text-journal-blue">
            Why Choose ArticleBeacon?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<Upload className="h-10 w-10 text-journal-blue-light" />}
              title="Simple Submission"
              description="Our streamlined process makes it easy to submit your manuscript and track its progress through every stage of review."
            />
            <FeatureCard 
              icon={<Search className="h-10 w-10 text-journal-blue-light" />}
              title="Global Visibility"
              description="Get your research indexed in major academic databases including Scopus, Web of Science, and PubMed."
            />
            <FeatureCard 
              icon={<FileText className="h-10 w-10 text-journal-blue-light" />}
              title="Rapid Publication"
              description="Benefit from our efficient review process designed to maintain quality while reducing time to publication."
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="journal-container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <StatCard value="5000+" label="Published Articles" />
            <StatCard value="10000+" label="Registered Authors" />
            <StatCard value="150+" label="Partner Journals" />
            <StatCard value="95%" label="Author Satisfaction" />
          </div>
        </div>
      </section>

      {/* Recent Publications */}
      <section className="py-16 bg-white">
        <div className="journal-container">
          <h2 className="text-3xl font-bold text-center mb-12 text-journal-blue">
            Latest Published Research
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <PublicationCard 
              title="Advances in Neural Network Architecture for Climate Prediction"
              authors="Zhang, L., Smith, J., Kumar, A."
              journal="Journal of Computational Climate Science"
              date="May 2025"
            />
            <PublicationCard 
              title="Novel Approaches to Sustainable Urban Development in Mega-Cities"
              authors="Johnson, M., Patel, R., García, E."
              journal="Urban Planning & Sustainability"
              date="April 2025"
            />
            <PublicationCard 
              title="Quantum Computing Applications in Pharmaceutical Research"
              authors="Lee, S., Anderson, T., Müller, K."
              journal="Quantum Systems in Medicine"
              date="April 2025"
            />
          </div>
          
          <div className="text-center mt-10">
            <Button asChild variant="outline">
              <Link to="/publications">View All Publications</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-journal-blue text-white">
        <div className="journal-container text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Share Your Research?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            Join thousands of researchers who have already published with ArticleBeacon.
            Our submission process is designed to be straightforward and researcher-friendly.
          </p>
          <Button asChild size="lg" className="bg-white text-journal-blue hover:bg-gray-100">
            <Link to="/submit">Submit Your Manuscript</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => (
  <Card className="border-none shadow-md h-full">
    <CardContent className="pt-6 flex flex-col items-center text-center h-full">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-journal-blue">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </CardContent>
  </Card>
);

interface StatCardProps {
  value: string;
  label: string;
}

const StatCard = ({ value, label }: StatCardProps) => (
  <div className="p-6">
    <p className="text-4xl font-bold text-journal-blue mb-2">{value}</p>
    <p className="text-gray-600">{label}</p>
  </div>
);

interface PublicationCardProps {
  title: string;
  authors: string;
  journal: string;
  date: string;
}

const PublicationCard = ({ title, authors, journal, date }: PublicationCardProps) => (
  <Card className="h-full">
    <CardContent className="pt-6">
      <h3 className="font-semibold mb-2 hover:text-journal-blue-light">
        <Link to="#">{title}</Link>
      </h3>
      <p className="text-sm text-gray-600 mb-2">{authors}</p>
      <div className="flex justify-between text-sm">
        <span className="text-journal-blue-light">{journal}</span>
        <span className="text-gray-500">{date}</span>
      </div>
    </CardContent>
  </Card>
);

export default Index;
