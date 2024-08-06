export default function TableEmpty({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div className="px-8 py-8 flex items-center justify-center flex-1 flex-col">
      <div className="border-[2px] border-lighter border-dashed w-full h-full flex items-center justify-center flex-col rounded-md flex-1">
        <i className="bx bx-x-circle text-[4rem]"></i>
        <h2 className="text-2xl text-dark font-semibold mt-3 mb-1">{title}</h2>
        <p className="text-light">{subtitle}</p>
      </div>
    </div>
  );
}
