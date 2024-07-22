import { Course } from "@/lib/types";
import { useDialog } from "../general/Dialog";
import Input from "../ui/Input";
import { Button } from "../ui/Button";
import { useState } from "react";

export type DeleteConfirmationContext = {
  toBeDeleted: string;
  confirmationText: string;
  onDelete: () => void;
};

export default function DeleteConfirmation() {
  const [value, setValue] = useState("");
  const { contextData } = useDialog();
  const [errorMessage, setErrorMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const { toBeDeleted, confirmationText, onDelete } =
    contextData as DeleteConfirmationContext;

  const handleDelete = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");
    if (value !== confirmationText) {
      setErrorMessage("Invalid confirmation text");
      return;
    }
    setIsDeleting(true);
    onDelete();
  };

  return (
    <form onSubmit={handleDelete} className="bg-white rounded-md max-w-[30rem]">
      <div className="flex justify-between items-center px-6 pt-4 mb-3">
        <h2 className="text- font-semibold ">
          Are you sure you want to delete?
        </h2>
        <i className="bx bx-x text-xl text-dark"></i>
      </div>
      <div className="bg-orange-100 text-highlight px-6 py-4">
        <p className="text-red-600">
          This action is{" "}
          <span className="text-red-600 font-semibold">IRREVERSIBLE</span>
        </p>
      </div>
      <p className="py-6 px-6 text-light">
        You are about to delete {toBeDeleted} which would result in the deletion
        of any data related to it.
      </p>
      <div className="px-6 pb-6">
        <Input
          placeholder="Type here"
          label={`Please type "${toBeDeleted}" to confirm `}
          onChange={(e) => {
            setValue((e.target as HTMLInputElement).value);
          }}
          errorMessage={errorMessage}
        />
        <Button
          variant={"destructive"}
          className="mt-6 w-full py-5"
          isLoading={isDeleting}
          disabled={isDeleting}
        >
          I understand, delete this this item
        </Button>
      </div>
    </form>
  );
}
