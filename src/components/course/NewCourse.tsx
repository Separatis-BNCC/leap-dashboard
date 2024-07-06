import { useDialog } from "../general/Dialog";
import { Button } from "../ui/Button";
import Input from "../ui/Input";

export default function NewCourse() {
  const { closeDialog } = useDialog();

  return (
    <article className="bg-white w-full max-w-[40rem] py-8 px-10 rounded-md">
      <h2 className="text-2xl text-dark font-semibold mb-2">Add Course</h2>
      <p className="text-light border-b-[1px] border-lighter pb-4 mb-8">
        Create a new course which will be available globally
      </p>
      <Input
        placeholder="Microservice with Golang"
        label="Name"
        className="mb-6"
      />
      <Input placeholder="Kemanggisan" label="Region" className="mb-6" />

      <div className="flex items-center justify-end gap-2 mt-16">
        <div className="grid grid-cols-2 gap-4 [&>button]:px-6">
          <Button variant={"secondary"} onClick={() => closeDialog()}>
            Cancel
          </Button>
          <Button variant={"accent"}>Create</Button>
        </div>
      </div>
    </article>
  );
}
