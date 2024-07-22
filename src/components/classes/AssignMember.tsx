import ProfilePicture from "../general/ProfilePicture";
import { ScrollArea } from "../general/ScrollArea";
import { Button } from "../ui/Button";
import Input from "../ui/Input";
import { Checkbox } from "@radix-ui/react-checkbox";

export default function AssignMember() {
  return (
    <ScrollArea className="bg-white p-8 w-full max-w-[75rem] h-[calc(100%-6rem)] rounded-md [&>div>div]:!block [&>div>div]:h-full">
      <div className="flex flex-col h-full">
        <h2 className="text-2xl font-semibold mb-2">Assign Member</h2>
        <p className="text-light leading-[175%] border-b-[1px] border-lighter mb-8 pb-6">
          Assign members to this class. Only users with the member role will be
          visible in the list
        </p>
        <div className="grid grid-cols-2 flex-1 gap-6">
          <div className=" flex flex-col h-0 min-h-full">
            <h2 className="text-dark mb-4">
              Assigned Members <span className="text-lighter ml-1">14</span>
            </h2>
            <ScrollArea className="">
              <div className="rounded-md h-full flex-1 grid gap-4 pr-4">
                {new Array(12).fill("x").map(() => {
                  return (
                    <div className="grid grid-cols-[auto_1fr_auto] px-5 py-4 gap-x-4 rounded-md items-center bg-white border-[1px] border-bg shadow-[0rem_0.25rem_0.5rem_0rem_rgba(0,0,0,0.05)]">
                      <ProfilePicture className="row-span-2 h-[2.5rem] aspect-square" />
                      <p className="text-light">Selected</p>
                      <Checkbox className="row-span-2" />
                      <h2>Jacqueline Audrey Iman</h2>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
          <div className=" flex flex-col h-0 min-h-full">
            <h2 className="text-dark mb-4">All Members</h2>
            <div className="mb-4">
              <Input placeholder="Search by name..." />
            </div>
            <ScrollArea className="">
              <div className="border-[1px] border-bg rounded-md h-full flex-1">
                {new Array(12).fill("x").map(() => {
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
            </ScrollArea>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
}
