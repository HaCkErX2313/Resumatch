import { useState, useRef } from 'react';
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    processFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    processFile(file);
  };

  const processFile = (file: File | undefined) => {
    if (!file) return;

    if (!validateFile(file)) {
      setUploadStatus('error');
      return;
    }

    setUploadStatus('uploading');
    setTimeout(() => {
      setUploadStatus('success');
      onUploadComplete(file);
    }, 1000);
  };

  const validateFile = (file: File): boolean => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = /\.(pdf|doc|docx|jpg|jpeg|png|txt)$/i;

    if (file.size > maxSize) {
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 10MB',
        variant: 'destructive',
      });
      return false;
    }

    if (!file.name.match(allowedTypes)) {
      toast({
        title: 'Invalid file type',
        description: 'Upload PDF, DOC, DOCX, JPG, PNG, or TXT files only',
        variant: 'destructive',
      });
      return false;
    }

    return true;
  };

  const getStatusIcon = () => {
    if (uploadStatus === 'success') return <CheckCircle className="w-8 h-8 text-green-500" />;
    if (uploadStatus === 'error') return <AlertCircle className="w-8 h-8 text-red-500" />;
    return <Upload className="w-8 h-8 text-muted-foreground" />;
  };

  const getStatusText = () => {
    switch (uploadStatus) {
      case 'success':
        return 'Upload successful!';
      case 'error':
        return 'Upload failed. Try again.';
      case 'uploading':
        return 'Uploading...';
      default:
        return 'Upload your resume';
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto mt-6">
      <CardContent>
        <div
          className={`p-6 border-2 border-dashed rounded-lg text-center transition-colors duration-200 cursor-pointer ${
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
          onClick={handleBrowseClick}
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

            <label className="cursor-pointer">
              <input
                type="file"
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                onChange={handleFileSelect}
                ref={fileInputRef}
                className="hidden"
                disabled={uploadStatus === 'uploading'}
              />
              <Button
                type="button"
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
