import { LoaderCircle } from "lucide-react";
const loading = () => {
  return (
    <div className="animate-spin text-primary">
      <LoaderCircle size={100} />
    </div>
  );
};

export default loading;
