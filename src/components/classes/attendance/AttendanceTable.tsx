import RoleBadge from "@/components/course/RoleBadge";
import { Checkbox } from "@/components/general/Checkbox";
import { useDialog } from "@/components/general/Dialog";
import Table from "@/components/general/Table";
import useTableSelect from "@/hooks/table/useTableSelect";
import useFakeQuery from "@/hooks/useFakeQuery";
import { cn } from "@/lib/utils";
import { AttendanceProofContext } from "./AttendanceProofDialog";
import userSortColletion from "@/hooks/useSortCollection";
import AttendanceStatusPopover from "./AttendanceStatusPopover";

const fakeData = [
  {
    profile: {
      first_name: "Joseph",
      last_name: "Yusmita",
      email: "josephyusmita@gmail.com",
      role: 4,
    },
    status: 1,
    notes: null,
    proof: "https://picsum.photos/seed/picsum/1240/720",
    id: 1,
  },
  {
    profile: {
      first_name: "John",
      last_name: "Doe",
      email: "johndoe@gmail.com",
      role: 4,
    },
    status: 2,
    notes: "Some notes",
    proof: "https://picsum.photos/seed/picsum/1240/720",
    id: 2,
  },
  {
    profile: {
      first_name: "Jane",
      last_name: "Smith",
      email: "janesmith@gmail.com",
      role: 4,
    },
    status: 3,
    notes: "Some notes",
    proof: "https://picsum.photos/seed/picsum/1240/720",
    id: 3,
  },
  {
    profile: {
      first_name: "David",
      last_name: "Johnson",
      email: "davidjohnson@gmail.com",
      role: 4,
    },
    status: 4,
    notes: "Some notes",
    proof: "https://picsum.photos/seed/picsum/1240/720",
    id: 4,
  },
  {
    profile: {
      first_name: "Sarah",
      last_name: "Williams",
      email: "sarahwilliams@gmail.com",
      role: 4,
    },
    status: 1,
    notes: "Some notes",
    proof: "https://picsum.photos/seed/picsum/1240/720",
    id: 5,
  },
  {
    profile: {
      first_name: "Michael",
      last_name: "Brown",
      email: "michaelbrown@gmail.com",
      role: 4,
    },
    status: 1,
    notes: "Some notes",
    proof: "https://picsum.photos/seed/picsum/1240/720",
    id: 6,
  },
  {
    profile: {
      first_name: "Emily",
      last_name: "Davis",
      email: "emilydavis@gmail.com",
      role: 4,
    },
    status: 3,
    notes: "Some notes",
    proof: "https://picsum.photos/seed/picsum/1240/720",
    id: 7,
  },
  {
    profile: {
      first_name: "Daniel",
      last_name: "Wilson",
      email: "danielwilson@gmail.com",
      role: 4,
    },
    status: 4,
    notes: "Some notes",
    proof: "https://picsum.photos/seed/picsum/1240/720",
    id: 8,
  },
];

export default function AttendanceTable() {
  const query = useFakeQuery(fakeData, { swapOnKeyPress: true });
  const { showDialog } = useDialog();
  const { register, handleSelect, selectedData } = useTableSelect({
    data: query.data,
  });
  const { sortType, cycleSortType } = userSortColletion<
    (typeof fakeData)[number]
  >([
    {
      type: "Attendance",
      fn: (a, b) => a.status - b.status,
    },
    {
      type: "A-Z",
      fn: (a, b) => b.profile.first_name.localeCompare(a.profile.last_name),
    },
    {
      type: "Z-A",
      fn: (a, b) => a.profile.first_name.localeCompare(b.profile.last_name),
    },
  ]);

  return (
    <section className="flex flex-col flex-1">
      <Table.Container
        gridTemplateColumns="2rem minmax(20rem,1fr) repeat(2,minmax(10rem,1fr)) repeat(2,minmax(16rem,1fr))"
        isLoading={query.isPending}
      >
        <div className="flex justify-between mb-4">
          <div className="border-border border bg-white rounded-md px-4 flex items-center justify-center py-2">
            16 August, 2024
          </div>
          <div
            onClick={cycleSortType}
            className="border-border border bg-white rounded-md px-4 flex items-center justify-center py-2 cursor-pointer transition-all duration-100 hover:bg-slate-50"
          >
            {sortType.type}
          </div>
        </div>
        <Table.Content>
          <Table.Head>
            <Table.SelectAllCheckbox {...register("select-all-checkbox")} />
            <h2>Name</h2>
            <h2>Role</h2>
            <h2>Status</h2>
            <h2>Notes</h2>
            <p>Proof</p>
          </Table.Head>
          <Table.Rows
            data={query.data}
            sortFn={sortType?.fn}
            renderRows={(data) => {
              const isSelected = selectedData.find(
                (selected) => selected.id === data.id
              );
              return (
                <Table.Row onSelect={handleSelect(data, [".proof-link"])}>
                  <Checkbox checked={Boolean(isSelected)} />
                  <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-[1px]">
                    <div className="row-span-2 w-10 aspect-square rounded-full bg-slate-300"></div>
                    <p className="truncate">
                      {data.profile?.first_name} {data.profile?.last_name}
                    </p>
                    <p className="text-light truncate">{data.profile.email}</p>
                  </div>
                  <RoleBadge roleId={data.profile.role} />

                  <AttendanceStatusPopover status={data.status} />
                  <p className={cn("truncate", !data.notes && "text-light")}>
                    {data.notes || "No notes was added"}
                  </p>
                  <p
                    className="text-light underline hoverable-short hover:text-highlight proof-link"
                    onClick={() => {
                      showDialog("attendance-proof", {
                        email: data.profile.email,
                        name: `${data.profile.first_name} ${data.profile.last_name}`,
                        imgURL: data.proof,
                        week: 1,
                      } satisfies AttendanceProofContext);
                    }}
                  >
                    View Proof
                  </p>
                </Table.Row>
              );
            }}
          />
        </Table.Content>
      </Table.Container>
      <Table.SelectionToast {...register("toast")}></Table.SelectionToast>
    </section>
  );
}
