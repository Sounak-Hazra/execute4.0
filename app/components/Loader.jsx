import { Loader2 } from "lucide-react";

export default function LoadingOverlay() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-transparent bg-opacity-50 backdrop-blur-md z-50 pointer-events-none">
      <Loader2 className="w-16 h-16 text-white animate-spin" />
    </div>
  );
}
