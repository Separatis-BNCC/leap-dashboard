import RoleBadge from "@/components/course/RoleBadge";
import { Checkbox } from "@/components/general/Checkbox";
import useTableSelect from "@/hooks/table/useTableSelect";
import useUserQuery from "@/hooks/user/useUserQuery";
import { cn, formatDate } from "@/lib/utils";
import { getRegion } from "@/assets/lookup-data";
import Table from "../general/Table";
import { UserData } from "@/lib/types";
import TableSelectionToast from "../general/TableSelectionToast";
import TableEmpty from "../general/TableEmpty";

type Props = {
  // Harusnya ini klo api dah jadi

  // members: UserData["profile"][];
  members?: UserData[];
};

export default function ClassMemberTable({ members }: Props) {
  const { userData, userQuery } = useUserQuery();

  const {
    // handleReset,
    handleSelect,
    handleSelectAll,
    allSelected,
    selectedData,
    registerSelectionToast,
    // showPopup,
  } = useTableSelect({ data: userData });

  return (
    <div className="relative overflow-hidden flex-1 flex flex-col">
      <Table.Container
        isLoading={userQuery.isLoading}
        gridTemplateColumns={`2rem minmax(16rem,1fr) repeat(7,8rem) auto`}
        emptyElement={
          <TableEmpty
            title="This Class Has No Members"
            subtitle="Add new members and praetorian to this class"
          />
        }
      >
        <Table.Content>
          <Table.Head>
            <Checkbox onClick={handleSelectAll} checked={allSelected} />
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
            data={members}
            renderRows={(data) => {
              const isSelected = selectedData?.some(
                (item) => item.id === data.id
              );

              return (
                <Table.Row
                  highlighted={isSelected}
                  onSelect={handleSelect(data)}
                  key={data.id}
                >
                  <Checkbox checked={isSelected} />
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
                  <p>{data.profile?.major || "-"}</p>
                  <p>
                    {data.profile?.region
                      ? getRegion(data.profile?.region)
                      : "-"}
                  </p>
                  <p>{data.profile?.faculty || "-"}</p>

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
      <TableSelectionToast {...registerSelectionToast}>
        <div className="ml-4 flex items-center gap-2 justify-center">
          <i className="bx bxs-trash-alt text-lg text-white cursor-pointer hover:opacity-50 transition-all duration-100"></i>
          <p className="text-white whitespace-nowrap">Delete</p>
        </div>
      </TableSelectionToast>
      <div className="mt-4">
        <p className="text-light">
          Showing <span className="text-dark">2</span> out of{" "}
          <span className="text-dark">12</span>
        </p>
      </div>
    </div>
  );
}
