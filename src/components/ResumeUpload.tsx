import { useState, useCallback } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';

interface ResumeUploadProps {
  onUploadComplete: (file: File) => void;
}

const ResumeUpload = ({ onUploadComplete }: ResumeUploadProps) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');
  const { toast } = useToast();

  const validateFile = (file: File): boolean => {
    // Check file size (10MB limit)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB",
        variant: "destructive",
      });
      return false;
    }

    // Check file type - allow resume formats and images for testing
    const allowedTypes = /\.(pdf|doc|docx|jpg|jpeg|png|txt)$/i;
    if (!file.name.match(allowedTypes)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, Word document, or image file",
        variant: "destructive",
      });
      return false;
    }

    return true;
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    const file = files[0];
    
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      });
      return;
    }
    
    if (validateFile(file)) {
      handleFileUpload(file);
    }
  }, [toast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (validateFile(file)) {
        handleFileUpload(file);
      }
    }
    // Reset the input value to allow selecting the same file again
    e.target.value = '';
  };

  const handleFileUpload = (file: File) => {
    setUploadStatus('uploading');
    
    // Simulate upload delay with error handling
    setTimeout(() => {
      try {
        setUploadStatus('success');
        onUploadComplete(file);
        toast({
          title: "File uploaded successfully!",
          description: `${file.name} is being analyzed...`,
        });
      } catch (error) {
        setUploadStatus('error');
        toast({
          title: "Upload failed",
          description: "Please try again or contact support",
          variant: "destructive",
        });
      }
    }, 1500);
  };

  const getStatusIcon = () => {
    switch (uploadStatus) {
      case 'uploading':
        return <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />;
      case 'success':
        return <CheckCircle className="w-6 h-6 text-accent" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-destructive" />;
      default:
        return <Upload className="w-6 h-6 text-muted-foreground" />;
    }
  };

  const getStatusText = () => {
    switch (uploadStatus) {
      case 'uploading':
        return 'Uploading your file...';
      case 'success':
        return 'File uploaded successfully!';
      case 'error':
        return 'Upload failed. Please try again.';
      default:
        return 'Drag & drop your file here';
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-card hover:shadow-elegant transition-all duration-300">
      <CardContent className="p-8">
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
            isDragOver
              ? 'border-primary bg-gradient-hero'
              : uploadStatus === 'success'
              ? 'border-accent bg-accent/5'
              : 'border-muted-foreground/25 hover:border-primary/50'
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
        >
          <div className="flex flex-col items-center gap-4">
            {getStatusIcon()}
            
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {getStatusText()}
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                or click to browse files
              </p>
              <p className="text-xs text-muted-foreground">
                Supports PDF, DOC, DOCX, JPG, PNG, TXT • Max size 10MB
              </p>
            </div>

            <input
              type="file"
              accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
              onChange={handleFileSelect}
              className="hidden"
              id="resume-upload"
              disabled={uploadStatus === 'uploading'}
            />
            <label htmlFor="resume-upload">
              <Button 
                variant="outline" 
                className="cursor-pointer"
                disabled={uploadStatus === 'uploading'}
              >
                <FileText className="w-4 h-4 mr-2" />
                Choose File
              </Button>
            </label>
          </div>
        </div>

        {uploadStatus === 'success' && (
          <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg animate-fade-in">
            <div className="flex items-center gap-2 text-accent">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Ready for analysis!</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              Your resume has been uploaded and is being processed by our AI engine.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResumeUpload;