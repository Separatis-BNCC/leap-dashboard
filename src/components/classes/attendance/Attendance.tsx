import Table from "@/components/general/Table";
import AttendanceTable from "./AttendanceTable";
import useUserQuery from "@/hooks/user/useUserQuery";
import RoleBadge from "@/components/course/RoleBadge";

export default function Attendance() {
  const { userData } = useUserQuery();

  return (
    <div className="flex-1">
      <Table.Container gridTemplateColumns="repeat(5,minmax(8rem,1fr))">
        <Table.Content>
          <Table.Head>
            <p>Name</p>
            <p>Status</p>
            <p>Notes</p>
            <p>Proof</p>
            <p>Attended</p>
          </Table.Head>
          <Table.Rows
            data={userData}
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
