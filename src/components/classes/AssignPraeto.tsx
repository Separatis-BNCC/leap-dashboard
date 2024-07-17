import { Checkbox } from "../general/Checkbox";
import ProfilePicture from "../general/ProfilePicture";
import { ScrollArea } from "../general/ScrollArea";
import { Button } from "../ui/Button";
import Input from "../ui/Input";

export default function AssignPraeto() {
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
          <Button variant={"accent"} className="row-span-2 px-8">
            Save
          </Button>
          <h2>Jacqueline Audrey Iman</h2>
        </div>
        <div className="mt-4 flex-1 flex flex-col px-1">
          <div className="mb-4">
            <Input placeholder="Search by name..." />
          </div>
          <div className="flex-1 min-h-[20rem]">
            <ScrollArea className="h-0 min-h-full">
              <div className="">
                {new Array(10).fill("x").map(() => {
                  return (
                    <div className="grid grid-cols-[auto_1fr_auto] px-5 py-4 gap-x-4 rounded-md items-center">
                      <ProfilePicture className="row-span-2 h-[2.5rem] aspect-square" />
                      <p className="text-light">Selected</p>
                      <Checkbox className="row-span-2" />
                      <h2>Jacqueline Audrey Iman</h2>
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
