type Props = {
  name: string;
  memberCount: number;
  status: string;
};

export default function CourseCard({ name, memberCount, status }: Props) {
  return (
    <li className="grid grid-cols-[auto_1fr_auto] gap-x-4 gap-y-2 items-center transition-all duration-100 hover:bg-bg cursor-pointer px-6 py-4 ">
      <div className="bg-highlight flex items-center justify-center rounded-sm aspect-square w-12">
        <i className="bx bxl-html5 text-white text-3xl"></i>
      </div>
      <div className="">
        <p className="text-light mb-[1px]">Course</p>
        <h3 className="text-dark text-lg leading-[100%]">{name}</h3>
      </div>
      <div className="flex flex-col items-center">
        <p className="mb-1">{memberCount} Members</p>
        <div className="bg-bg text-highlight text-[0.75rem] px-4 py-[0.125rem] rounded-full">
          {status}
        </div>
      </div>
    </li>
  );
}
