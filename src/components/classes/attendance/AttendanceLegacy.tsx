import Table from "@/components/general/Table";

import RoleBadge from "@/components/course/RoleBadge";
import { useOutletContext } from "react-router-dom";
import { ClassContext } from "@/pages/ClassLayout";
import TableEmpty from "@/components/general/TableEmpty";

export default function Attendance() {
  const { classData, members } = useOutletContext<ClassContext>();

  return (
    <div className="flex-1 mt-6 flex flex-col">
      <Table.Container
        isLoading={!classData}
        gridTemplateColumns="repeat(5,minmax(8rem,1fr))"
        emptyElement={
          <TableEmpty
            title="This Class Has No Members"
            subtitle="Add new members and praetorian to this class"
          />
        }
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg">
            Members{" "}
            <span className="text-lg text-light">{members?.length}</span>
          </h2>
          <Table.Sorter />
        </div>
        <Table.Content>
          <Table.Head>
            <p>Name</p>
            <p>Status</p>
            <p>Notes</p>
            <p>Proof</p>
            <p>Attended</p>
          </Table.Head>
          <Table.Rows
            data={members}
            sortField={{
              "A-Z": "profile.first_name",
              "Z-A": "profile.first_name",
            }}
            renderRows={(data) => {
              return (
                <Table.Row>
                  <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-[1px]">
                    <div className="row-span-2 w-10 aspect-square rounded-full bg-slate-300"></div>
                    <p className="truncate">
                      {data.profile?.first_name} {data.profile?.last_name}
                    </p>
                    <p className="text-light truncate">{data.email}</p>
                  </div>
                  <RoleBadge roleId={data.role} />
                </Table.Row>
              );
            }}
          />
        </Table.Content>
      </Table.Container>
    </div>
  );
}
