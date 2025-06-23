import ScaleLoader from "react-spinners/ScaleLoader";

export default function Loading({ text }: { text?: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center text-center text-muted py-12 gap-4">
        <ScaleLoader color="#3ecf8e" />
        <p className="text-sm font-bold">{text || ""}</p>
      </div>
    </div>
  );
}
