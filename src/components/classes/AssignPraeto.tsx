import useClassUserMutation from "@/hooks/class/useClassUserMutation";
import { Checkbox } from "../general/Checkbox";
import ProfilePicture from "../general/ProfilePicture";
import { ScrollArea } from "../general/ScrollArea";
import { Button } from "../ui/Button";
import { useDialog } from "../general/Dialog";
import { useMemo, useState } from "react";
import useUserQuery from "@/hooks/user/useUserQuery";
import { cn } from "@/lib/utils";
import SearchInput from "../ui/SearchInput";
import { UserData } from "@/lib/types";

export type AssignPraetoContext = {
  classId: number;
  currentPraeto?: UserData;
};

export default function AssignPraeto() {
  const [searchValue, setSearchValue] = useState("");
  const {
    contextData: { classId, currentPraeto },
  } = useDialog<AssignPraetoContext>();
  const { assignPraetoMutation } = useClassUserMutation({
    classId,
  });
  const [selectedPraetoId, setSelectedPraetoId] = useState<number | undefined>(
    currentPraeto?.id
  );
  const { userData } = useUserQuery();

  const handleSelect = (id: number) => () => {
    setSelectedPraetoId(id);
  };
  const handleSave = () => {
    if (!selectedPraetoId) return;
    assignPraetoMutation.mutate({ id: selectedPraetoId });
  };
  const selectedPraeto = useMemo(() => {
    return userData?.find(
      (user) => user.role === 2 && user.id === selectedPraetoId
    );
  }, [userData, selectedPraetoId]);

  return (
    <ScrollArea className="bg-white p-8 max-w-[37.5rem] h-[calc(100%-5rem)]  rounded-md [&>div>div]:!block [&>div>div]:h-full">
      <div className="flex flex-col h-full">
        <h2 className="text-2xl font-semibold mb-2">Assign Praetorian</h2>
        <p className="text-light leading-[175%] border-b-[1px] border-lighter mb-8 pb-6">
          Assign praetorian to this class. Only users with the Prateorian role
          will be visible in the list
        </p>
        <div className="grid grid-cols-[auto_1fr_auto] p-5 gap-x-4 border-[1px] border-lighter rounded-md items-center">
          <ProfilePicture className="row-span-2 h-[2.5rem] aspect-square" />
          <p className="text-light">Selected</p>
          <Button
            variant={"accent"}
            className="row-span-2 px-8"
            disabled={assignPraetoMutation.isPending}
            isLoading={assignPraetoMutation.isPending}
            onClick={handleSave}
          >
            Save
          </Button>
          <h2>{selectedPraeto?.email || "No Praeto Assigned"}</h2>
        </div>
        <div className="mt-4 flex-1 flex flex-col px-1">
          <div className="mb-4">
            <SearchInput
              className="[&>input]:py-3"
              placeholder="Search by name"
              onSearch={setSearchValue}
            />
          </div>
          <div className="flex-1 min-h-[20rem]">
            <ScrollArea className="h-0 min-h-full">
              <div className="">
                {userData
                  ?.filter(
                    (user) =>
                      user.role === 2 && user.email.includes(searchValue)
                  )
                  .map((user) => {
                    const isSelected = selectedPraetoId === user.id;
                    return (
                      <div
                        key={user.id}
                        className={cn(
                          "grid grid-cols-[auto_1fr_auto] px-5 py-4 gap-x-4 rounded-md items-center hoverable-short",
                          isSelected ? "bg-slate-100" : "hover:bg-slate-50"
                        )}
                        onClick={handleSelect(user.id)}
                      >
                        <ProfilePicture className="row-span-2 h-[2.5rem] aspect-square" />
                        <p className="text-light">Praetorian</p>
                        <Checkbox className="row-span-2" checked={isSelected} />
                        <h2>{`${user.profile?.first_name} ${user.profile?.last_name}`}</h2>
                      </div>
                    );
                  })}
              </div>
            </ScrollArea>{" "}
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
