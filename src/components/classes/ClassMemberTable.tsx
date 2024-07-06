import useUserQuery from "@/hooks/user/useUserQuery";
import Table from "../general/Table";
import { Button } from "../ui/Button";

export default function ClassMemberTable() {
  // TEMP : Ntar ini ganti sama query yang buat class membernya
  const { userQuery, userData } = useUserQuery();

  return (
    <div className="mt-4 flex flex-col flex-1 ">
      <div className="grid grid-cols-[auto_auto_1fr] gap-6 items-center mt-8">
        <h2 className="text-xl">Member list</h2>
        <Button variant={"accent"} className="px-6 h-fit py-2">
          Add +{" "}
        </Button>
        <div className="bg-white py-[6px] px-6 rounded-md items-center justify-end w-fit flex gap-8 ml-auto">
          <p>All</p>
          <p className="bg-bg px-4 py-1 rounded-sm text-highlight">
            Attendance
          </p>
          <p>Report Card</p>
        </div>
      </div>
      <Table.Container
        isLoading={userQuery.isLoading}
        gridTemplateColumns="4rem minmax(16rem,1fr) repeat(4,12rem)"
        className="bg-white mt-6"
      >
        <Table.Head>
          <p>No</p>
          <p>Name</p>
          <p>BNCC ID</p>
          <p>Attendace</p>
          <p>Mid Score</p>
          <p>Final Score</p>
        </Table.Head>
        <Table.Content>
          {userData?.map((user, i) => {
            return (
              <Table.Row>
                <p>{i + 1 <= 9 ? `0${i + 1}` : i}</p>
                <p>
                  {user.profile?.first_name} {user.profile?.last_name}
                </p>
                <p>{user.id}</p>
                <p>5/14</p>
                <p>95%</p>
                <p>100%</p>
              </Table.Row>
            );
          })}
        </Table.Content>
      </Table.Container>
    </div>
  );
}
