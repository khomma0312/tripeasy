import { Button } from "@/components/shadcn/button";
import { ButtonDropdownWithTripRoutePointRegisterFormDialog } from "../button-dropdown-with-trip-route-point-regsiter-form-dialog";
import { MenuItem } from "@/components/shared/dropdown-with-form-dialog";
import { BedDoubleIcon } from "lucide-react";
import { DropdownMenuTrigger } from "@/components/shadcn/dropdown-menu";

type Props = {
  menuItems: MenuItem[];
};

export const TripRoutePointAccommodationAddButton = ({ menuItems }: Props) => {
  return (
    <ButtonDropdownWithTripRoutePointRegisterFormDialog
      menuItems={menuItems}
      DropdownTrigger={<DropdownTrigger />}
    />
  );
};

const DropdownTrigger = () => {
  return (
    <DropdownMenuTrigger asChild>
      <div className="flex flex-col items-center gap-2">
        <Button variant="outline" className="size-10 rounded-full">
          <BedDoubleIcon />
        </Button>
        <p className="text-xs">宿泊予定を追加</p>
      </div>
    </DropdownMenuTrigger>
  );
};
