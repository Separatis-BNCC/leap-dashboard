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

  return (
    <div className="relative">
      <ScrollArea className="rounded-md">
        <ul className="grid bg-white pt-8 pb-6 min-w-[40rem]">
          <li className="grid grid-cols-[1fr_8fr_5fr_5fr_3fr_auto] gap-x-3 mb-4 pl-8 pr-10">
            <Checkbox onClick={handleSelectAll} checked={allSelected} />
            <h2>Name</h2>
            <h2>Role</h2>
            <h2>NIM</h2>
            <h2 className="whitespace-nowrap">Date Joined</h2>
            <i className="bx bx-dots-vertical-rounded text-lg invisible"></i>
          </li>
          {userData.map((data) => {
            const isSelected = selectedData?.some(
              (item) => item.id === data.id
            );

            return (
              <li
                key={data.id}
                className={cn(
                  "grid grid-cols-[1fr_8fr_5fr_5fr_3fr_auto] gap-x-3 pl-8 pr-10 items-center py-4 cursor-pointer transition-all duration-200",
                  isSelected ? "bg-bg" : "hover:bg-bg/50"
                )}
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

                <p>{data.profile?.nim}</p>
                <p className="truncate">
                  {data.profile?.birth_date
                    ? formatDate(new Date(data.profile.birth_date))
                    : "-"}
                </p>
                <i className="bx bx-dots-vertical-rounded text-lg "></i>
              </li>
            );
          })}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
      <div
        className={cn(
          "bg-highlight text-white w-fit items-center justify-center px-4 py-3 flex rounded-md left-[50%] translate-x-[-50%] absolute bottom-[-2.5rem] translate-y-[0.5rem] opacity-0 transition-all duration-200",
          selectedData.length > 0 &&
            showPopup &&
            "opacity-100 translate-y-[0rem]"
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
