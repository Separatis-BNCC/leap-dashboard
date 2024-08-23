import { ScrollArea } from "@/components/general/ScrollArea";
import Table from "@/components/general/Table";

export default function Attendance() {
  return (
    <section className="flex flex-col">
      <Table.Container gridTemplateColumns="2rem repeat(5,minmax(16rem,1fr)">
        <Table.Head>
          <Table.Row></Table.Row>
          <Table.Row></Table.Row>
          <Table.Row></Table.Row>
          <Table.Row></Table.Row>
        </Table.Head>
        <Table.Content>
          <Table.Rows />
        </Table.Content>
      </Table.Container>
    </section>
  );
}
