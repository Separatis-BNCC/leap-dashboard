import { Checkbox } from "@/components/general/Checkbox";
import useTableSelect from "@/hooks/table/useTableSelect";
import useUserQuery from "@/hooks/user/useUserQuery";
import { formatDate } from "@/lib/utils";
import { getFaculty, getRegion } from "@/assets/lookup-data";
import Table from "../general/Table";
import UserRoleBulkPopover from "../user/UserRoleBulkPopover";
import RoleBadge from "../course/RoleBadge";
import SearchInput from "../ui/SearchInput";
import TableSelectionToast from "../general/TableSelectionToast";

/**
 * Bulk Role , status
 * Confirmation modal buat make sure editan dah bener (are you sure), di table gbs tambahin data tapi bisa remove
 */

export default function UserMasterTable() {
  const { userData, userQuery } = useUserQuery();
  const {
    handleSelect,
    handleSelectAll,
    allSelected,
    registerSelectionToast,
    selectedData,
  } = useTableSelect({ data: userData });
  return (
    <div className="relative overflow-hidden flex-1 flex flex-col ">
      <Table.Container
        isLoading={userQuery.isLoading}
        gridTemplateColumns={`2rem minmax(16rem,1fr) repeat(7,minmax(8rem,0.5fr)) auto`}
      >
        <div className="mb-5 flex items-center">
          <p className="text-dark text-lg">
            All Users{" "}
            <span className="ml-1 text-lg text-light">
              {userData?.length || ""}
            </span>
          </p>
          <div className="flex-1 flex justify-end items-end gap-x-4">
            <SearchInput />
            <Table.Sorter />
          </div>
        </div>
        <Table.Content>
          <Table.Head className="border-b-[1px] border-slate-200 mb-0">
            <Checkbox onClick={handleSelectAll} checked={allSelected} />
            <h2>Name</h2>
            <h2>Role</h2>
            <h2>NIM</h2>
            <h2>Line ID</h2>
            <h2>Major</h2>
            <h2>Region</h2>
            <h2>Faculty</h2>
            <h2 className="whitespace-nowrap">Date Joined</h2>
            <i className="bx bx-dots-vertical-rounded invisible "></i>
          </Table.Head>
          <Table.Rows
            data={userData}
            sortField={{
              "A-Z": "profile.first_name",
              "Z-A": "profile.first_name",
            }}
            renderRows={(data) => {
              const isSelected = selectedData?.some(
                (item) => item.id === data.id
              );

              return (
                <Table.Row
                  key={data.id}
                  highlighted={isSelected}
                  onSelect={handleSelect(data, [".popover-container"])}
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
                  <p className="truncate">
                    {data.profile?.region
                      ? getRegion(data.profile.region)
                      : "-"}
                  </p>
                  <p className="truncate">
                    {data.profile?.faculty
                      ? getFaculty(data.profile.faculty)
                      : "-"}
                  </p>

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
        <UserRoleBulkPopover
          // Causes this component to rerender each time userQuery gets update (AKA when a mutation happens to the user)
          key={userQuery.status}
          userIds={selectedData.map((data) => data.id)}
          userDataList={selectedData}
        />
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
