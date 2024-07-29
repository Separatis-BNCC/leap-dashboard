import UserMasterTable from "@/components/master-data/UserMasterTable";
import { Button } from "@/components/ui/Button";
import SearchInput from "@/components/ui/SearchInput";

export default function MasterData() {
  return (
    <div className="p-8 flex flex-col flex-1 h-full">
      <h1 className="text-dark font-semibold text-2xl mb-1">User List</h1>
      <p className="text-light mb-4 pb-4">
        Manage your team members and their account permissions here
      </p>
      <UserMasterTable />
    </div>
  );
}
