import { Button } from "@/components/shadcn/button";
import { ButtonWithTripRoutePointRegisterAccommodationFormDialog } from "../button-with-trip-route-point-register-accommodation-form-dialog";
import { MenuItem } from "@/components/shared/dropdown-with-form-dialog";
import { BedDoubleIcon } from "lucide-react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

type Props = {
  menuItems: MenuItem[];
};

export const TripRoutePointAccommodationAddButton = ({ menuItems }: Props) => {
  return (
    <ButtonWithTripRoutePointRegisterAccommodationFormDialog
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
