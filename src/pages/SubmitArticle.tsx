
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, User, Check } from "lucide-react";
import Layout from "@/components/Layout";

// Form schema
const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }),
  abstract: z.string().min(100, {
    message: "Abstract must be at least 100 characters.",
  }),
  keywords: z.string().min(3, {
    message: "Please provide at least a few keywords separated by commas.",
  }),
  category: z.string({
    required_error: "Please select a category.",
  }),
  authorFirstName: z.string().min(1, { message: "First name is required." }),
  authorLastName: z.string().min(1, { message: "Last name is required." }),
  authorEmail: z.string().email({ message: "Please enter a valid email." }),
  authorAffiliation: z.string().min(1, { message: "Affiliation is required." }),
});

type FormValues = z.infer<typeof formSchema>;

const defaultValues: Partial<FormValues> = {
  title: "",
  abstract: "",
  keywords: "",
  category: "",
  authorFirstName: "",
  authorLastName: "",
  authorEmail: "",
  authorAffiliation: "",
};

const SubmitArticle = () => {
  const [activeTab, setActiveTab] = useState("manuscript");
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
    mode: "onChange",
  });

  const onSubmit = (data: FormValues) => {
    if (!selectedFile) {
      toast({
        variant: "destructive",
        title: "Missing manuscript file",
        description: "Please upload your manuscript file before submitting.",
      });
      return;
    }

    // In a real app, you would send this data to your backend
    console.log({ ...data, manuscriptFile: selectedFile });
    
    toast({
      title: "Submission received!",
      description: "Your article has been submitted successfully.",
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <Layout>
      <div className="journal-container py-10">
        <h1 className="page-title">Submit Your Research Article</h1>
        
        <div className="mb-8">
          <p className="text-gray-700 mb-4">
            Thank you for choosing to submit your manuscript to ArticleBeacon. This form guides you through the 
            submission process. Please ensure all information is accurate and complete.
          </p>
          <div className="bg-blue-50 border-l-4 border-journal-blue-light p-4 text-sm text-journal-blue">
            <p className="font-medium">Before you begin:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Prepare your manuscript according to our Author Guidelines</li>
              <li>Have all author information ready</li>
              <li>Prepare your abstract, keywords, and manuscript as separate files</li>
              <li>File uploads should be in PDF format and less than 20MB</li>
            </ul>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="manuscript" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Manuscript Details
            </TabsTrigger>
            <TabsTrigger value="authors" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Author Information
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              File Upload
            </TabsTrigger>
          </TabsList>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <TabsContent value="manuscript">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Article Title</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter the full title of your article" {...field} />
                            </FormControl>
                            <FormDescription>
                              Provide a concise and informative title that accurately reflects your research
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="abstract"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Abstract</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Enter your abstract (max 300 words)" 
                                className="min-h-[200px]" 
                                {...field} 
                              />
                            </FormControl>
                            <FormDescription>
                              A brief summary of your research including objectives, methods, results, and conclusions
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="keywords"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Keywords</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter keywords separated by commas" {...field} />
                            </FormControl>
                            <FormDescription>
                              3-5 keywords that describe the content of your paper
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="category"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Research Category</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="life-sciences">Life Sciences</SelectItem>
                                <SelectItem value="physical-sciences">Physical Sciences</SelectItem>
                                <SelectItem value="social-sciences">Social Sciences</SelectItem>
                                <SelectItem value="humanities">Humanities</SelectItem>
                                <SelectItem value="computer-science">Computer Science</SelectItem>
                                <SelectItem value="engineering">Engineering</SelectItem>
                                <SelectItem value="medicine">Medicine</SelectItem>
                                <SelectItem value="environmental-science">Environmental Science</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormDescription>
                              Select the category that best describes your research
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end mt-6">
                      <Button 
                        type="button" 
                        onClick={() => setActiveTab("authors")}
                      >
                        Next: Author Information
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="authors">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <FormField
                          control={form.control}
                          name="authorFirstName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>First Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter first name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="authorLastName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Last Name</FormLabel>
                              <FormControl>
                                <Input placeholder="Enter last name" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <FormField
                        control={form.control}
                        name="authorEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="Enter email address" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="authorAffiliation"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Institutional Affiliation</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter institution/organization name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setActiveTab("manuscript")}
                      >
                        Previous: Manuscript Details
                      </Button>
                      <Button 
                        type="button" 
                        onClick={() => setActiveTab("upload")}
                      >
                        Next: File Upload
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="upload">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      <div 
                        className={`border-2 border-dashed rounded-lg p-10 text-center cursor-pointer transition-all ${
                          isDragging ? "border-journal-blue bg-blue-50" : "border-gray-300 hover:border-journal-blue-light"
                        }`}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                        onClick={() => document.getElementById("file-upload")?.click()}
                      >
                        {selectedFile ? (
                          <div className="flex flex-col items-center">
                            <div className="bg-journal-green/10 p-3 rounded-full mb-4">
                              <Check className="h-8 w-8 text-journal-green" />
                            </div>
                            <p className="font-medium text-journal-blue mb-1">File uploaded successfully</p>
                            <p className="text-sm text-gray-500">{selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)</p>
                            <Button 
                              type="button" 
                              variant="outline" 
                              size="sm" 
                              className="mt-4"
                              onClick={(e) => { 
                                e.stopPropagation(); 
                                setSelectedFile(null); 
                              }}
                            >
                              Change File
                            </Button>
                          </div>
                        ) : (
                          <div className="flex flex-col items-center">
                            <div className="bg-journal-blue-light/10 p-3 rounded-full mb-4">
                              <Upload className="h-8 w-8 text-journal-blue-light" />
                            </div>
                            <p className="font-medium text-journal-blue mb-1">Upload your manuscript</p>
                            <p className="text-sm text-gray-500 mb-2">Drag and drop your file here or click to browse</p>
                            <p className="text-xs text-gray-400">Supported formats: PDF, DOCX, DOC (Max: 20MB)</p>
                          </div>
                        )}
                        <input 
                          id="file-upload" 
                          type="file" 
                          accept=".pdf,.docx,.doc" 
                          className="hidden" 
                          onChange={handleFileChange}
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-between mt-6">
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => setActiveTab("authors")}
                      >
                        Previous: Author Information
                      </Button>
                      <Button type="submit">Submit Article</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </form>
          </Form>
        </Tabs>
      </div>
    </Layout>
  );
};

export default SubmitArticle;
