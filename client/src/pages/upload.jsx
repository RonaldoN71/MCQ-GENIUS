import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useAuthSync } from "../lib/auth";
import { Navigation } from "../components/navigation";
import { ProgressBreadcrumb } from "../components/progress-breadcrumb";
import { FileUpload } from "../components/file-upload";
import { useLocation } from "wouter";
import { toast } from "../hooks/use-toast";
import { useQuizStore } from "../store/quizStore"; // ✅ Zustand store

export default function Upload() {
  const { user } = useAuthSync();
  const [, setLocation] = useLocation();
  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadMutation = useMutation({
    mutationFn: async ({ file, options }) => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("noteSetName", options.noteSetName || "Untitled Notes");
      formData.append("difficulty", options.difficulty);
      formData.append("questionCount", options.questionCount.toString());
      formData.append("userId", user?.id);
      formData.append("noteSetDescription", options.noteSetDescription);
      //todo: add api
      const API = "http://localhost:3001";

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          const next = prev + 10;
          if (next >= 90) {
            clearInterval(progressInterval);
          }
          return Math.min(next, 90);
        });
      }, 200);

      const response = await fetch(`${API}/api/process-document`, {
        method: "POST",
        body: formData,
      });

      clearInterval(progressInterval);
      setUploadProgress(100);

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      return await response.json(); // ✅ backend response with questions
    },
    onSuccess: (result) => {
      // ✅ Save result to Zustand store
      useQuizStore.getState().setQuiz(result);

      toast({
        title: "Quiz Generated Successfully!",
        description: `${result.questions.length} questions created in ${result.noteSet.name}`,
      });

      // Redirect to quiz page
      setLocation(`/quiz/${result.noteSet.id}`);
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
      setUploadProgress(0);
    },
  });

  const steps = [
    { id: "upload", name: "Upload File", status: "current" },
    { id: "generate", name: "Generate MCQ", status: "upcoming" },
    { id: "quiz", name: "Take Quiz", status: "upcoming" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProgressBreadcrumb steps={steps} />

        <FileUpload
          onUpload={(file, options) =>
            uploadMutation.mutateAsync({ file, options })
          }
          isUploading={uploadMutation.isPending}
          uploadProgress={uploadProgress}
        />
      </div>
    </div>
  );
}
