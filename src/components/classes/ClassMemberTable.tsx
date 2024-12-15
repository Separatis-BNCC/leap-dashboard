import RoleBadge from "@/components/course/RoleBadge";
import { formatDate } from "@/lib/utils";
import { getFaculty, getMajor, getRegion } from "@/assets/lookup-data";
import Table from "../general/Table";
import TableEmpty from "../general/TableEmpty";
import { useOutletContext, useParams } from "react-router-dom";
import { ClassContext } from "@/pages/ClassLayout";
import { useDialog } from "../general/Dialog";
import { AssignMemberContext } from "./AssignMember";
import SearchInput from "../ui/SearchInput";
import { Button } from "../ui/Button";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";

export default function ClassMemberTable() {
  const { showDialog } = useDialog();
  const { classId } = useParams();
  const [search, setSearch] = useState("");
  const { classData, isFetchingClassData } = useOutletContext<ClassContext>();

  const members = classData?.members;

  const handleOpenAssignMemberModal = () => {
    if (!classId) return;
    showDialog("assign-member", {
      classId: +classId,
      members: classData?.members,
    } satisfies AssignMemberContext);
  };

  return (
    <div className="mt-6 flex-1 justify-center mb-4 flex-col flex">
      <div className="flex mb-4 items-center">
        <p className="flex-1 text-xl h-fit flex items-center">
          All Users{" "}
          <span className="ml-2 text-xl text-slate-500">
            {members?.length || <Skeleton height={"2rem"} width={"2rem"} />}
          </span>
        </p>
        <SearchInput onSearch={setSearch} value={search} />
        <Button
          variant={"accent"}
          className="ml-4"
          onClick={handleOpenAssignMemberModal}
        >
          Manage Members
        </Button>
      </div>
      <div className="relative overflow-hidden flex-1 flex flex-col">
        <Table.Container
          isLoading={(isFetchingClassData && !members) || !members}
          gridTemplateColumns={`minmax(16rem,1fr) repeat(7,12rem) auto`}
          emptyElement={
            <TableEmpty
              title="This Class Has No Members"
              subtitle="Add new members and praetorian to this class"
            />
          }
        >
          <Table.Content>
            <Table.Head className="[&>*]:text-light">
              <h2>Name</h2>
              <h2>Role</h2>
              <h2>NIM</h2>
              <h2>Line ID</h2>
              <h2>Major</h2>
              <h2>Region</h2>
              <h2>Faculty</h2>
              <h2 className="whitespace-nowrap">Date Joined</h2>
              <i className="bx bx-dots-vertical-rounded text-lg invisible "></i>
            </Table.Head>
            <Table.Rows
              data={members?.filter((member) =>
                `${member.profile?.first_name}${member.profile?.last_name}`.includes(
                  search
                )
              )}
              renderRows={(data) => {
                return (
                  <Table.Row key={data.id} className="[&_p]:truncate">
                    <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-[1px]">
                      <div className="row-span-2 w-10 aspect-square rounded-full bg-slate-300"></div>
                      <p className="truncate">
                        {data.profile?.first_name} {data.profile?.last_name}
                      </p>
                      <p className="text-light truncate">{data.email}</p>
                    </div>
                    <RoleBadge roleId={data.role} />

                    <p className="truncate">{data.profile?.nim || "-"}</p>
                    <p>{data.profile?.line_id || "-"}</p>
                    <p>{getMajor(data.profile?.major) || "-"}</p>
                    <p>{getRegion(data.profile?.region) || "-"}</p>
                    <p>{getFaculty(data.profile?.faculty) || "-"}</p>

                    {/* === TEMP === */}
                    <p className="truncate">
                      {data.profile?.birth_date
                        ? formatDate(new Date(data.profile.birth_date))
                        : "-"}
                    </p>
                    <i className="bx bx-dots-vertical-rounded text-lg "></i>
                  </Table.Row>
                );
              }}
            />
          </Table.Content>
        </Table.Container>

        <div className="mt-4">
          <p className="text-light">
            Showing <span className="text-dark">2</span> out of{" "}
            <span className="text-dark">12</span>
          </p>
        </div>
      </div>
    </div>
  );
}
