import Badge from "@/components/general/Badge";
import Table from "@/components/general/Table";

export default function AssignmentTable() {
  return (
    <Table.Container
      className="flex-1"
      gridTemplateColumns="minmax(12rem,1.5fr) repeat(3, minmax(8rem,1fr))"
    >
      <div className="mb-4 flex justify-between items-center">
        <p className="text-lg">
          Members <span className="ml-1 text-lg text-light">30</span>
        </p>
        <Table.Sorter />
      </div>
      <Table.Content>
        <Table.Head className="[&>p]:text-light">
          <p>Home</p>
          <p>Status</p>
          <p>Answer</p>
          <p>Final Score</p>
        </Table.Head>
        <Table.Row>
          <div className="grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-[1px]">
            <div className="row-span-2 w-10 aspect-square rounded-full bg-slate-300"></div>
            <p className="truncate">Joseph Yusmita</p>
            <p className="text-light truncate">josephyusmita@gmail.com</p>
          </div>
          <Badge variant={"green"}>Scored</Badge>
          <p className="truncate">github.link</p>
          <p className="truncate">89.00%</p>
        </Table.Row>
      </Table.Content>
    </Table.Container>
  );
}
