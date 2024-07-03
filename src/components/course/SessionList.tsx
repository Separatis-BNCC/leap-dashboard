import { cn } from "@/lib/utils";
import { SwiperSlide, Swiper } from "swiper/react";
import { Button } from "../ui/Button";
import { useState } from "react";

type Props = { sessions: { title: string; outlineCount: number }[] };

export default function SessionList({ sessions }: Props) {
  const [selected, setSelected] = useState(1);

  return (
    <Swiper
      slidesPerView={3}
      spaceBetween={16}
      className="cursor-pointer h-[21rem]"
    >
      {sessions.map((session, i) => {
        const isSelected = i + 1 === selected;

        return (
          <SwiperSlide key={`${session.title}-${i}`}>
            <div
              className={cn(
                "bg-white p-6 rounded-md flex flex-col h-full",
                isSelected && "bg-highlight"
              )}
            >
              <div className="bg-bg text-highlight w-10 aspect-square flex items-center justify-center font-semibold text-lg rounded-md mb-4">
                {i + 1}
              </div>
              <h2
                className={cn(
                  "text-3xl leading-[135%] text-highlight font-semibold flex-1 line-clamp-3",
                  isSelected && "text-white"
                )}
              >
                {session.title}
                {/* {truncateText(session.title, COURSE_TITLE_TRUNCATE_LENGTH)} */}
              </h2>
              <p
                className={cn(
                  "text-highlight/80 mt-4 mb-8",
                  isSelected && "text-white/80"
                )}
              >
                {session.outlineCount} Outlines
              </p>
              <Button variant={"secondary"} className="w-full [&&]:py-5">
                View Outlines
              </Button>
            </div>
          </SwiperSlide>
        );
      })}
      <SwiperSlide className="">
        <div className="flex flex-col gap-4 items-center text-3xl justify-center h-full new-course bg-white p-8 rounded-lg">
          <div className="border-[2px] border-highlight border-dashed  p-4 flex flex-col items-center justify-center w-full h-full rounded-lg">
            <i className="bx bx-add-to-queue text-[2.5rem] mb-4 text-highlight"></i>
            <p className="text-lg text-highlight">+ Add Course</p>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}
