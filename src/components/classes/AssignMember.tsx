import { Classes } from "@/lib/types";
import { useDialog } from "../general/Dialog";
import ProfilePicture from "../general/ProfilePicture";
import { ScrollArea } from "../general/ScrollArea";
import useUserQuery from "@/hooks/user/useUserQuery";
import { useMemo, useState } from "react";
import useClassUserMutation from "@/hooks/class/useClassUserMutation";
import { LoadingSpinner } from "../ui/LoadingSpinner";
import useClassQuery from "@/hooks/class/useClassQuery";
import SearchInput from "../ui/SearchInput";

export type AssignMemberContext = {
  members?: Classes["members"];
  classId: number;
};

export default function AssignMember() {
  const [searchVal, setSearchVal] = useState("");
  const { userData } = useUserQuery();
  const {
    contextData: { classId },
  } = useDialog<AssignMemberContext>();
  const { classData } = useClassQuery({ classId: classId });
  const { assignMemberMutation, removeMemberMutation } = useClassUserMutation({
    classId,
  });

  // Loading state
  const [pendingUserIdAssignment, setPendingUserIdAssignment] = useState<
    number[]
  >([]);
  const [pendingUserIdRemoval, setPendingUserIdRemoval] = useState<number[]>(
    []
  );

  // Get all user that has a member role
  const membersList = useMemo(() => {
    return userData?.filter((user) => user.role === 4);
  }, [userData]);

  // Extract only users who are members
  const classMembers = useMemo(() => {
    return classData?.members.filter((member) => member.role === 4);
  }, [classData]);

  // Extract users who are not members from the class.
  const notClassMembers = useMemo(() => {
    if (!classMembers) return membersList;
    const classMemberIds = new Set(classMembers.map((member) => member.id));
    return membersList?.filter((member) => !classMemberIds?.has(member.id));
  }, [membersList, classMembers]);

  const handleDelete = (id: number) => {
    removeMemberMutation.mutate(id, {
      onSuccess: () => setPendingUserIdRemoval([]),
    });
    setPendingUserIdRemoval((cur) => [...cur, id]);
  };

  const handleAssign = (id: number) => {
    assignMemberMutation.mutate(
      { ids: [id] },
      // Only triggers at the very last success so we can set the array to empty
      { onSettled: () => setPendingUserIdAssignment([]) }
    );

    // Add user to the pending list (to display loading spinner)
    setPendingUserIdAssignment((cur) => [...cur, id]);
  };

  return (
    <ScrollArea className="bg-white p-8 w-full max-w-[75rem] h-[calc(100%-6rem)] rounded-md [&>div>div]:!block [&>div>div]:h-full border-[1px] border-lighter">
      <div className="flex flex-col h-full ">
        <h2 className="text-2xl font-semibold mb-2">Assign Member</h2>
        <p className="text-light leading-[175%] border-b-[1px] border-lighter mb-8 pb-6">
          Assign members to this class. Only users with the member role will be
          visible in the list
        </p>
        <div className="grid grid-cols-2 flex-1 gap-6">
          <div className=" flex flex-col h-0 min-h-full">
            <h2 className="text-dark mb-4">
              Assigned Members{" "}
              <span className="text-lighter ml-1">{classMembers?.length}</span>
            </h2>
            {classMembers?.length === 0 && (
              <div className="flex items-center justify-center flex-col h-full border-[1px] border-slate-500 border-dashed rounded-md">
                <i className="bx bx-user text-[3rem]"></i>
                <p className="text-2xl font-semibold mt-3">No User Assigned</p>
                <p className="text-light mt-2 max-w-[20rem] leading-[150%] text-center">
                  Assign user to this class by selecting them from the right
                </p>
              </div>
            )}
            <ScrollArea className="">
              <div className="rounded-md h-full flex-1 grid gap-4 pr-4">
                {classMembers?.map((member) => {
                  const isBeingDeleted = pendingUserIdRemoval.includes(
                    member.id
                  );
                  return (
                    <div
                      className="grid grid-cols-[auto_1fr_auto] px-5 py-4 gap-x-4 rounded-md items-center bg-white border-[1px] border-border shadow-soft"
                      key={member.id}
                    >
                      <ProfilePicture className="row-span-2 h-[2.5rem] aspect-square" />
                      <p className="text-light">Selected</p>
                      <div className="row-span-2">
                        {removeMemberMutation.isPending && isBeingDeleted ? (
                          <LoadingSpinner />
                        ) : (
                          <i
                            className="bx bx-x text-2xl  hoverable-short text-light hover:opacity-50"
                            onClick={() => {
                              if (isBeingDeleted) return;
                              handleDelete(member.id);
                            }}
                          ></i>
                        )}
                      </div>
                      <h2>{member.email}</h2>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
          <div className=" flex flex-col h-0 min-h-full">
            <h2 className="text-dark mb-4">All Members</h2>
            <div className="mb-4">
              <SearchInput onSearch={setSearchVal} />
            </div>
            <ScrollArea className="border-border border-[1px] shadow-soft rounded-md h-full flex-1">
              <div className="">
                {notClassMembers
                  ?.filter((member) =>
                    `${member.profile?.first_name} ${member.profile?.last_name}`.includes(
                      searchVal
                    )
                  )
                  .map((user) => {
                    const isBeingAssigned = pendingUserIdAssignment.includes(
                      user.id
                    );

                    return (
                      <div
                        className="grid grid-cols-[auto_1fr_auto] px-5 py-4 gap-x-4 rounded-md items-center hoverable-short hover:bg-slate-50 "
                        onClick={() => {
                          if (isBeingAssigned) return;
                          handleAssign(user.id);
                        }}
                      >
                        <ProfilePicture className="row-span-2 h-[2.5rem] aspect-square" />
                        <p className="text-light">Member</p>
                        <div className="row-span-2">
                          {assignMemberMutation.isPending &&
                            isBeingAssigned && (
                              <LoadingSpinner className="mr-2" />
                            )}
                        </div>
                        <h2>
                          {user.profile?.first_name} {user.profile?.last_name}
                        </h2>
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
