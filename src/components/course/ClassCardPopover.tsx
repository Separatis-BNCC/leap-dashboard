import { useState } from "react";
import { useDialog } from "../general/Dialog";
import { DeleteConfirmationContext } from "../general/DeleteConfirmation";
import useClassMutation from "@/hooks/class/useClassMutation";
import { Classes } from "@/lib/types";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover";
type Props = {
  classes: Classes;
};

export default function ClassCardPopover({ classes }: Props) {
  const { showDialog } = useDialog();
  const [isOpen, setIsOpen] = useState(false);
  const { deleteMutation } = useClassMutation();

  const handleDelete = () => {
    setIsOpen(false);
    showDialog("delete-confirmation", {
      confirmationText: classes.name,
      toBeDeleted: classes.name,
      onDelete() {
        deleteMutation.mutate(classes.id);
      },
    } satisfies DeleteConfirmationContext);
  };

  return (
    <Popover open={isOpen} onOpenChange={(value) => setIsOpen(value)}>
      <PopoverTrigger>
        <i className="bx bx-dots-vertical-rounded text-2xl text-light hover:text-lighter hoverable-short"></i>
      </PopoverTrigger>
      <PopoverContent className="bg-white w-fit top-8 border-[1px] border-slate-200 py-2 px-4 gap-1 rounded-md grid">
        <div
          className="flex gap-2 items-center hoverable-short hover:opacity-50"
          onClick={handleDelete}
        >
          <i className="bx bx-trash text-red-400 text-lg"></i>
          <p className="text-red-400">Delete</p>
        </div>
        <div className="flex gap-2 items-center hoverable-short hover:opacity-50">
          <i className="bx bx-edit-alt text-light text-lg"></i>
          <p className="text-light">Edit</p>
        </div>
      </PopoverContent>
    </Popover>
  );
}
