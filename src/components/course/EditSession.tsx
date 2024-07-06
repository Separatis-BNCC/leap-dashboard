import { useDialog } from "../general/Dialog";
import { Button } from "../ui/Button";
import Input from "../ui/Input";

type Session = {
  title: string;
  description: string;
  schedule: string;
  outlineCount: number;
};

export default function EditSession() {
  const { contextData } = useDialog();
  const sessionData = contextData as Session;

  return (
    <article className="bg-white w-full max-w-[40rem] py-8 px-10 rounded-md">
      <h2 className="text-2xl text-dark font-semibold mb-2">Edit Session</h2>
      <p className="text-light border-b-[1px] border-lighter pb-4 mb-8">
        Create a new session which will be available globally
      </p>
      <Input
        placeholder="Introduction to Object Oriented Programming"
        label="Title"
        className="mb-6"
      />

      {/* <DatePicker label="Schedule Date" className="mb-6" /> */}
      <p className="mb-2">Description</p>
      <textarea
        className="px-6 py-4 border-[1px] border-bg resize-none w-full rounded-md h-[8.75rem]"
        placeholder="Description..."
      ></textarea>
      <div className="flex items-center justify-end gap-2 mt-16">
        <div className="grid grid-cols-2 gap-4 [&>button]:px-6">
          <Button variant={"secondary"}>Cancel</Button>
          <Button variant={"accent"}>Save</Button>
        </div>
      </div>
    </article>
  );
}
