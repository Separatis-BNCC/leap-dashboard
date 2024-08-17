import { cn, toSorted } from "@/lib/utils";
import { SwiperSlide, Swiper } from "swiper/react";
import { Button } from "../ui/Button";
import { useState } from "react";
import { Session } from "@/lib/types";
import { useDialog } from "../general/Dialog";
import Skeleton from "react-loading-skeleton";
import { MaterialDetailContext } from "../material/MaterialDialog";

type Props = { sessions?: Session[] };

export default function SessionList({ sessions }: Props) {
  const { showDialog } = useDialog();
  const selected = 1;

  if (!sessions)
    return (
      <div className="h-[15rem] grid grid-cols-3 gap-4">
        {new Array(3).fill("x").map((_, i) => (
          <Skeleton height={"100%"} key={i} />
        ))}
      </div>
    );

  return (
    <Swiper
      slidesPerView={"auto"}
      spaceBetween={16}
      width={100}
      className="cursor-pointer h-[15rem]"
    >
      {toSorted(sessions, (a, b) => a.week - b.week)?.map((session, i) => {
        const isSelected = i + 1 === selected;

        return (
          <SwiperSlide
            key={`${session.description}-${i}`}
            className="!max-w-[20rem]"
          >
            <div
              className={cn(
                "bg-white p-6 rounded-md relative overflow-hidden flex justify-center flex-col h-full border-[1px] border-slate-200 ",
                isSelected &&
                  "bg-gradient-to-bl from-highlight-dark to-highlight"
              )}
            >
              <div className="flex-1 mt-4">
                <p
                  className={cn("mb-2 text-light", isSelected && "text-border")}
                >
                  Session {session.week}
                </p>

                <h2
                  className={cn(
                    "text-xl leading-[135%] text-dark mb-4 font-semibold line-clamp-3",
                    isSelected && "text-white"
                  )}
                >
                  {session.description}
                </h2>
              </div>
              <Button
                variant={"hollow"}
                className={cn(
                  "w-fit text-light hover:bg-bg/50 rounded-full  gap-1  pl-6 pr-4 h-fit py-1 view-session-detail",
                  isSelected &&
                    "bg-highlight-dark border-none text-white [&>i]:!text-white hover:bg-highlight-dark/60"
                )}
                onClick={() =>
                  showDialog("material-detail", {
                    session,
                  } satisfies MaterialDetailContext)
                }
              >
                Details
                <i className="bx bx-chevron-right text-lg text-light leading-[1.25rem] "></i>
              </Button>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
