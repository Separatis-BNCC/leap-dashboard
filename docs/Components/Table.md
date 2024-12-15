# Table Component

Base usage of the table component.
```tsx
import { Checkbox } from "@/components/general/Checkbox";
import Table from "@/components/general/Table";
import useTableSelect from "@/hooks/table/useTableSelect";
import useUserQuery from "@/hooks/user/useUserQuery";

export default function Attendance() {
  // Array of data objects to be rendered
  const { userData } = useUserQuery();

  const { register, handleSelect, selectedData } = useTableSelect({
    data: userData,
  });
  return (
    <section className="flex flex-col flex-1">
      <Table.Container gridTemplateColumns="2rem repeat(4,minmax(16rem,1fr)">
        <Table.Content>
          <Table.Head>
            <Table.SelectAllCheckbox {...register("select-all-checkbox")} />
            <h2>Name</h2>
            <h2>Role</h2>
            <h2>Status</h2>
            <h2>Notes</h2>
          </Table.Head>
          <Table.Rows
            data={userData}
            renderRows={(data) => {
              const isSelected = selectedData.find(
                (selected) => selected.id === data.id
              );
              return (
                <Table.Row onSelect={handleSelect(data)}>
                  <Checkbox checked={Boolean(isSelected)} />
                  <p></p>
                  <p></p>
                  <p></p>
                  <p></p>
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
```