
import { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CheckCircle, AlertCircle, FileX, Edit } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";

// Sample data for submissions
const submissions = [
  {
    id: "sub-001",
    title: "Neural Network Applications for Climate Prediction Models",
    journal: "Journal of Computational Climate Science",
    submittedDate: "2025-05-01",
    status: "under-review",
    progress: 50,
  },
  {
    id: "sub-002",
    title: "Sustainable Urban Development Framework for Megacities",
    journal: "Urban Planning & Sustainability",
    submittedDate: "2025-04-15",
    status: "revision-requested",
    progress: 75,
    feedback: "Minor revisions needed on methodology section",
  },
  {
    id: "sub-003",
    title: "Quantum Computing in Pharmaceutical Research",
    journal: "Quantum Systems in Medicine",
    submittedDate: "2025-04-02",
    status: "accepted",
    progress: 100,
    publicationDate: "2025-06-15",
  },
  {
    id: "sub-004",
    title: "Analysis of Renewable Energy Policy Impacts on Rural Communities",
    journal: "Energy Policy Review",
    submittedDate: "2025-03-20",
    status: "rejected",
    progress: 100,
    feedback: "Study scope too limited for journal requirements",
  },
  {
    id: "sub-005",
    title: "Machine Learning for Medical Imaging Analysis",
    journal: "Digital Health Technologies",
    submittedDate: "2025-02-10",
    status: "published",
    progress: 100,
    publicationDate: "2025-04-25",
    doi: "10.1234/dhtech.2025.1234",
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all");

  // Filter submissions based on active tab
  const filteredSubmissions = activeTab === "all" 
    ? submissions 
    : submissions.filter(sub => sub.status === activeTab);

  return (
    <Layout>
      <div className="journal-container py-10">
        <div className="flex justify-between items-center mb-8">
          <h1 className="page-title">Author Dashboard</h1>
          <Button asChild>
            <Link to="/submit">New Submission</Link>
          </Button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Total Submissions"
            value="5"
            icon={<FileText className="h-5 w-5 text-journal-blue-light" />}
          />
          <StatCard
            title="Under Review"
            value="1"
            icon={<Clock className="h-5 w-5 text-yellow-500" />}
          />
          <StatCard
            title="Published"
            value="1"
            icon={<CheckCircle className="h-5 w-5 text-journal-green" />}
          />
          <StatCard
            title="Needs Revision"
            value="1"
            icon={<Edit className="h-5 w-5 text-orange-500" />}
          />
        </div>

        {/* Submissions List */}
        <Card className="mb-8">
          <CardHeader className="pb-2">
            <CardTitle>Manuscript Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Submissions</TabsTrigger>
                <TabsTrigger value="under-review">Under Review</TabsTrigger>
                <TabsTrigger value="revision-requested">Revision Needed</TabsTrigger>
                <TabsTrigger value="accepted">Accepted</TabsTrigger>
                <TabsTrigger value="published">Published</TabsTrigger>
              </TabsList>
              
              <TabsContent value={activeTab}>
                <div className="space-y-4">
                  {filteredSubmissions.length > 0 ? (
                    filteredSubmissions.map((submission) => (
                      <SubmissionItem key={submission.id} submission={submission} />
                    ))
                  ) : (
                    <div className="text-center py-10 text-gray-500">
                      <p>No submissions in this category</p>
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <DeadlineItem
                title="Revision submission deadline"
                submission="Sustainable Urban Development Framework for Megacities"
                dueDate="2025-05-20"
                urgent
              />
              <DeadlineItem
                title="Proofreading deadline"
                submission="Quantum Computing in Pharmaceutical Research"
                dueDate="2025-05-15"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

interface StatCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const StatCard = ({ title, value, icon }: StatCardProps) => (
  <Card>
    <CardContent className="flex items-center p-6">
      <div className="bg-journal-blue/5 p-3 rounded-full mr-4">
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </CardContent>
  </Card>
);

interface SubmissionProps {
  submission: {
    id: string;
    title: string;
    journal: string;
    submittedDate: string;
    status: string;
    progress: number;
    feedback?: string;
    publicationDate?: string;
    doi?: string;
  };
}

const SubmissionItem = ({ submission }: SubmissionProps) => {
  const statusConfig = {
    "under-review": {
      label: "Under Review",
      color: "bg-yellow-100 text-yellow-800",
      icon: <Clock className="h-4 w-4 mr-1" />,
    },
    "revision-requested": {
      label: "Revision Requested",
      color: "bg-orange-100 text-orange-800",
      icon: <Edit className="h-4 w-4 mr-1" />,
    },
    "accepted": {
      label: "Accepted",
      color: "bg-blue-100 text-blue-800",
      icon: <CheckCircle className="h-4 w-4 mr-1" />,
    },
    "rejected": {
      label: "Rejected",
      color: "bg-red-100 text-red-800",
      icon: <FileX className="h-4 w-4 mr-1" />,
    },
    "published": {
      label: "Published",
      color: "bg-green-100 text-green-800",
      icon: <CheckCircle className="h-4 w-4 mr-1" />,
    },
  };

  const status = statusConfig[submission.status as keyof typeof statusConfig];

  const formattedDate = new Date(submission.submittedDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <Card className="border-gray-200 hover:shadow-md transition">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="flex-grow">
            <Link to={`/submission/${submission.id}`} className="font-semibold text-journal-blue hover:text-journal-blue-light">
              {submission.title}
            </Link>
            <div className="text-sm text-gray-500 mt-1">
              <span>{submission.journal}</span>
              <span className="mx-2">•</span>
              <span>Submitted: {formattedDate}</span>
            </div>
            
            {submission.feedback && (
              <div className="mt-2 text-sm bg-gray-50 p-3 rounded-md">
                <span className="font-medium text-journal-blue">Feedback: </span>
                {submission.feedback}
              </div>
            )}
            
            {submission.doi && (
              <div className="mt-2 text-sm">
                <span className="font-medium">DOI: </span>
                <a 
                  href={`https://doi.org/${submission.doi}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-journal-blue-light hover:underline"
                >
                  {submission.doi}
                </a>
              </div>
            )}
          </div>
          
          <div className="sm:text-right">
            <Badge 
              className={cn("flex items-center mb-2", status.color)}
              variant="outline"
            >
              {status.icon}
              {status.label}
            </Badge>
            
            <div className="mt-3">
              <div className="flex items-center justify-end mb-1">
                <span className="text-xs text-gray-500 mr-2">Progress</span>
                <span className="text-xs font-medium">{submission.progress}%</span>
              </div>
              <Progress 
                value={submission.progress} 
                className={cn(
                  "h-2 w-full sm:w-48",
                  submission.status === "rejected" ? "bg-red-200" : ""
                )}
              />
            </div>

            {submission.status !== "rejected" && (
              <div className="mt-4">
                <Button asChild size="sm" variant="outline">
                  <Link to={`/submission/${submission.id}`}>View Details</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

interface DeadlineProps {
  title: string;
  submission: string;
  dueDate: string;
  urgent?: boolean;
}

const DeadlineItem = ({ title, submission, dueDate, urgent }: DeadlineProps) => {
  const formattedDate = new Date(dueDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  // Calculate days remaining
  const today = new Date();
  const due = new Date(dueDate);
  const diffTime = due.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div className="flex items-center justify-between border-b pb-4 last:border-0">
      <div>
        <p className="font-medium">{title}</p>
        <p className="text-sm text-gray-600">{submission}</p>
      </div>
      <div className="text-right">
        <p className={`font-medium ${urgent ? "text-red-600" : "text-gray-800"}`}>
          {formattedDate}
        </p>
        <p className={`text-sm ${diffDays < 5 ? "text-red-500" : "text-gray-500"}`}>
          {diffDays} days remaining
        </p>
      </div>
    </div>
  );
};

export default Dashboard;
