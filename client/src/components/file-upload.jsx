import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, File, X, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

export function FileUpload({ onUpload, isUploading, uploadProgress }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [difficulty, setDifficulty] = useState("medium");
  const [questionCount, setQuestionCount] = useState(10);
  const [noteSetName, setNoteSetName] = useState("");
  const [noteSetDescription, setNoteSetDescription] = useState("");

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
      "text/plain": [".txt"],
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
    },
    maxFiles: 5,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const handleUpload = async () => {
    if (selectedFile) {
      await onUpload(selectedFile, {
        difficulty,
        questionCount,
        noteSetName,
        noteSetDescription,
      });
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
  };

  return (
    <div
      className="bg-card rounded-lg border border-border p-8 shadow-sm"
      data-testid="file-upload"
    >
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Upload Your Content
        </h2>
        <p className="text-muted-foreground">
          Upload documents, images, or PDFs to generate MCQ questions
        </p>
      </div>

      {!selectedFile ? (
        <div
          {...getRootProps()}
          className={`
            upload-area border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all
            ${isDragActive ? "border-primary bg-muted" : "border-border hover:border-primary hover:bg-muted"}
          `}
          data-testid="dropzone"
        >
          <input {...getInputProps()} />
          <div className="mb-4">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {isDragActive ? "Drop the file here" : "Drag and drop your files here"}
          </h3>
          <p className="text-muted-foreground mb-4">or click to browse</p>
          <Button type="button" data-testid="browse-files">
            Choose Files
          </Button>
          <p className="text-sm text-muted-foreground mt-4">
            Supports PDF, DOC, DOCX, TXT, JPG, PNG (Max 10MB)
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* File Preview */}
          <div
            className="flex items-center justify-between p-3 bg-accent rounded-lg"
            data-testid="selected-file"
          >
            <div className="flex items-center space-x-3">
              <File className="h-5 w-5 text-primary" />
              <span className="font-medium">{selectedFile.name}</span>
              <span className="text-sm text-muted-foreground">
                {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <Button
                variant="ghost"
                size="sm"
                onClick={removeFile}
                disabled={isUploading}
                data-testid="remove-file"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* NoteSet Name & Description */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Note Set Name
              </label>
              <input
                type="text"
                value={noteSetName}
                onChange={(e) => setNoteSetName(e.target.value)}
                placeholder="e.g. Physics Chapter 1"
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                disabled={isUploading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Note Set Description
              </label>
              <textarea
                value={noteSetDescription}
                onChange={(e) => setNoteSetDescription(e.target.value)}
                placeholder="Optional description of your notes"
                rows={3}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                disabled={isUploading}
              />
            </div>
          </div>

          {/* Question Count + Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Number of Questions
              </label>
              <select
                value={questionCount}
                onChange={(e) => setQuestionCount(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                disabled={isUploading}
                data-testid="question-count-select"
              >
                <option value={5}>5 Questions</option>
                <option value={10}>10 Questions</option>
                <option value={15}>15 Questions</option>
                <option value={20}>20 Questions</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Difficulty Level
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:ring-2 focus:ring-ring focus:border-transparent"
                disabled={isUploading}
                data-testid="difficulty-select"
              >
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>

          {/* Progress */}
          {isUploading && (
            <div className="space-y-4" data-testid="upload-progress">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                <p className="text-foreground font-medium">
                  Generating your MCQ questions...
                </p>
                <p className="text-sm text-muted-foreground">
                  This may take a few moments
                </p>
              </div>
              <Progress value={uploadProgress} className="w-full" />
              <p className="text-center text-sm text-muted-foreground">
                Processing content... {uploadProgress}%
              </p>
            </div>
          )}

          {/* Upload Button */}
          {!isUploading && (
            <div className="text-center">
              <Button
                onClick={handleUpload}
                size="lg"
                className="px-8 py-3"
                data-testid="generate-mcq-button"
              >
                <Upload className="h-5 w-5 mr-2" />
                Generate MCQ Questions
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
