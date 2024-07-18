import { cn, toSorted } from "@/lib/utils";
import { SwiperSlide, Swiper } from "swiper/react";
import { Button } from "../ui/Button";
import { useState } from "react";
import { Session } from "@/lib/types";
import { useDialog } from "../general/Dialog";
import Skeleton from "react-loading-skeleton";

type Props = { sessions?: Session[]; courseId?: number };

export default function SessionList({ sessions, courseId }: Props) {
  const { showDialog } = useDialog();
  const [selected, setSelected] = useState(1);

  // If session is LOADED but empty.
  if (sessions && sessions.length === 0)
    return (
      <div className="h-[21rem] flex items-center justify-center flex-col border-[3px] border-lighter border-dotted rounded-md">
        <h2 className="text-2xl text-dark font-semibold mb-1">
          No Sessions Found
        </h2>
        <p className="text-light mb-5">
          Looks like you haven't added any sessions yet
        </p>
        <Button
          variant={"accent"}
          className="py-5 px-7"
          onClick={() => showDialog("add-session", courseId)}
        >
          Add Session +
        </Button>
      </div>
    );

  if (!sessions)
    return (
      <div className="h-[21rem] grid grid-cols-3 gap-4">
        {new Array(3).fill("x").map(() => (
          <Skeleton height={"100%"} />
        ))}
      </div>
    );

  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={16}
      className="cursor-pointer h-[21rem]"
    >
      {toSorted(sessions, (a, b) => a.week - b.week).map((session, i) => {
        const isSelected = i + 1 === selected;

        return (
          <SwiperSlide key={`${session.description}-${i}`}>
            <div
              className={cn(
                "bg-white p-6 rounded-md flex flex-col h-full",
                isSelected && "bg-highlight"
              )}
            >
              <div className="bg-bg text-highlight w-10 aspect-square flex items-center justify-center font-semibold text-lg rounded-md mb-4">
                {session.week}
              </div>
              <h2
                className={cn(
                  "text-3xl leading-[135%] text-highlight font-semibold flex-1 line-clamp-3",
                  isSelected && "text-white"
                )}
              >
                {session.description}
              </h2>
              <p
                className={cn(
                  "text-highlight/80 mt-4 mb-8",
                  isSelected && "text-white/80"
                )}
              >
                {session.outlineCount || 0} Outlines
              </p>
              <Button variant={"secondary"} className="w-full [&&]:py-5">
                View Outlines
              </Button>
            </div>
          </SwiperSlide>
        );
      })}
      {/* <SwiperSlide className="">
        <div className="flex flex-col gap-4 items-center text-3xl justify-center h-full new-course bg-white p-8 rounded-lg">
          <div className="border-[2px] border-highlight border-dashed  p-4 flex flex-col items-center justify-center w-full h-full rounded-lg">
            <i className="bx bx-add-to-queue text-[2.5rem] mb-4 text-highlight"></i>
            <p className="text-lg text-highlight">+ Add Course</p>
          </div>
        </div>
      </SwiperSlide> */}
    </Swiper>
  );
}
