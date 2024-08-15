import { ScrollArea } from "../general/ScrollArea";

export default function AllClasses() {
  const classes = new Array(10).fill("x");

  return (
    <section className="bg-white p-6 rounded-md flex-1 flex flex-col">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <i className="bx bx-code-alt text-2xl"></i>
          <h2 className="text-lg">All Classes</h2>
        </div>
        <p className="underline text-highlight hover:text-highlight-light transition-all duration-100 cursor-pointer">
          View All
        </p>
      </div>
      <ScrollArea className="min-h-[25rem] h-0 mt-5 ">
        <ul className="bg-white grid gap-4 pr-4">
          {classes.map((_, i) => {
            return (
              <li
                key={i}
                className="grid grid-cols-[minmax(4rem,1fr)_repeat(3,minmax(8rem,2fr))_auto] border boder-border px-4 py-2 items-center rounded-md"
              >
                <p className="text-light">FE-A</p>
                <p className="text-light">Front-End</p>
                <p className="text-light flex items-center">
                  <i className="bx bx-time-five mr-2 text-lg text-light"></i>
                  Mon, 15.20
                </p>
                <p className="text-light flex items-center">
                  <i className="bx bx-user mr-2 text-lg text-light"></i>
                  14 Members
                </p>
                <i className="bx bx-chevron-right text-2xl"></i>
              </li>
            );
          })}
        </ul>{" "}
      </ScrollArea>
    </section>
  );
}
