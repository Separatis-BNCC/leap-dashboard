import FileInput from "@/components/general/FileInput";

export default function ProjectCase() {
  return (
    <div className="flex flex-col px-8 py-6 bg-white rounded-md border-[1px] border-lighter">
      <h2 className="text-dark text-2xl font-semibold">Project Case</h2>
      <p className="text-light mt-3 mb-4">
        This following file will be broadcasted to class member as the project’s
        case
      </p>
      <FileInput placeholder="Select Project Case (.docx, .pdf)" />
    </div>
  );
}
