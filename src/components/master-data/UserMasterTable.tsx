import { Checkbox } from "@/components/general/Checkbox";
import useTableSelect from "@/hooks/table/useTableSelect";
import useUserQuery from "@/hooks/user/useUserQuery";
import { cn, formatDate, toSorted } from "@/lib/utils";
import { getFaculty, getRegion } from "@/assets/lookup-data";
import Table from "../general/Table";
import UserRolePopover from "../user/UserRolePopover";
import UserRoleBulkPopover from "../user/UserRoleBulkPopover";

/**
 * Bulk Role , status
 * Confirmation modal buat make sure editan dah bener (are you sure), di table gbs tambahin data tapi bisa remove
 */

export default function UserMasterTable() {
  const { userData, userQuery } = useUserQuery();
  const {
    handleReset,
    handleSelect,
    handleSelectAll,
    allSelected,
    selectedData,
    showPopup,
  } = useTableSelect({ data: userData });

  return (
    <div className="relative overflow-hidden flex-1 flex flex-col">
      <Table.Container
        isLoading={userQuery.isLoading}
        gridTemplateColumns={`2rem minmax(16rem,1fr) repeat(7,minmax(8rem,0.5fr)) auto`}
        className="bg-white"
      >
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
        <Table.Content>
          {userData &&
            toSorted(userData, (a, b) => a.id - b.id).map((data) => {
              const isSelected = selectedData?.some(
                (item) => item.id === data.id
              );

              return (
                <Table.Row
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
                  <UserRolePopover roleId={data.role} userIds={[data.id]} />

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

                  {/* === TEMP === */}
                  <p className="truncate">
                    {data.profile?.birth_date
                      ? formatDate(new Date(data.profile.birth_date))
                      : "-"}
                  </p>
                  <i className="bx bx-dots-vertical-rounded text-lg "></i>
                </Table.Row>
              );
            })}
        </Table.Content>
      </Table.Container>
      <div
        className={cn(
          "bg-highlight text-white w-fit items-center justify-center px-4 py-3 flex rounded-md left-[50%] translate-x-[-50%] absolute bottom-[-2.5rem] translate-y-[-2.25rem] opacity-0 transition-all duration-200",
          selectedData.length > 0 &&
            showPopup &&
            "opacity-100 translate-y-[-2.5rem]"
        )}
      >
        <div className="flex items-center justify-center gap-2 border-r-[2px] border-white pr-4">
          <i
            className="bx bx-x text-xl text-white cursor-pointer hover:opacity-50 transition-all duration-100"
            onClick={handleReset}
          ></i>
          <p className="text-white whitespace-nowrap">
            {selectedData.length} Selected
          </p>
        </div>
        <UserRoleBulkPopover
          // Causes this component to rerender each time userQuery gets update (AKA when a mutation happens to the user)
          key={userQuery.status}
          userIds={selectedData.map((data) => data.id)}
          userDataList={selectedData}
        />
      </div>
      <div className="mt-4">
        <p className="text-light">
          Showing <span className="text-dark">2</span> out of{" "}
          <span className="text-dark">12</span>
        </p>
      </div>
    </div>
  );
}
