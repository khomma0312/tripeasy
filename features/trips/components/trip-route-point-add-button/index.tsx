import { Button } from "@/components/shadcn/button";

type Props = {
  icon: React.ReactNode;
  onClick: () => void;
  label: string;
};

export const TripRoutePointAddButton = ({ icon, onClick, label }: Props) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <Button
        variant="outline"
        className="size-10 rounded-full"
        onClick={onClick}
      >
        {icon}
      </Button>
      <p className="text-xs">{label}</p>
    </div>
  );
};
