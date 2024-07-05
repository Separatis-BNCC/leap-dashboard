import RoleBadge from "@/components/course/RoleBadge";
import { Checkbox } from "@/components/general/Checkbox";
import { ScrollArea, ScrollBar } from "@/components/general/ScrollArea";
import useTableSelect from "@/hooks/table/useTableSelect";
import useUserQuery from "@/hooks/user/useUserQuery";
import { cn, formatDate } from "@/lib/utils";

/**
 * Bulk Role , status
 * Confirmation modal buat make sure editan dah bener (are you sure), di table gbs tambahin data tapi bisa remove
 */

const COL_SIZE = "10rem";

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

  if (userQuery.isLoading || !userData) return;

  // grid-cols-[1fr_8fr_5fr_5fr_5fr_auto]
  return (
    <div className="relative overflow-hidden flex-1 flex flex-col">
      <ScrollArea className="rounded-md flex-1 h-full [&>div>div]:h-full bg-white">
        <ul className="grid  pt-8 pb-6 min-w-[40rem]">
          <li
            className="grid grid-cols-[2rem_minmax(16rem,1fr)_8rem_8rem_8rem_8rem_8rem_8rem_8rem_auto] gap-x-3 mb-4 pl-8 pr-10"
            style={{
              gridTemplateColumns: `2rem minmax(16rem,1fr) repeat(7,${COL_SIZE}) auto`,
            }}
          >
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
          </li>
          {userData.map((data) => {
            const isSelected = selectedData?.some(
              (item) => item.id === data.id
            );

            return (
              <li
                key={data.id}
                className={cn(
                  "grid gap-x-3 pl-8 pr-10 items-center py-4 cursor-pointer transition-all duration-200",
                  isSelected ? "bg-bg" : "hover:bg-bg/50"
                )}
                style={{
                  gridTemplateColumns: `2rem minmax(16rem,1fr) repeat(7,${COL_SIZE}) auto`,
                }}
                onClick={handleSelect(data)}
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
                <p className="truncate">
                  {data.profile?.birth_date
                    ? formatDate(new Date(data.profile.birth_date))
                    : "-"}
                </p>
                <p>{data.profile?.line_id || "-"}</p>
                <p>{data.profile?.major || "-"}</p>
                <p>{data.profile?.region || "-"}</p>
                <p>{data.profile?.faculty || "-"}</p>
                <i className="bx bx-dots-vertical-rounded text-lg "></i>
              </li>
            );
          })}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
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
        <div className="ml-4 flex items-center gap-2 justify-center">
          <i className="bx bxs-trash-alt text-lg text-white cursor-pointer hover:opacity-50 transition-all duration-100"></i>
          <p className="text-white whitespace-nowrap">Delete</p>
        </div>
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
