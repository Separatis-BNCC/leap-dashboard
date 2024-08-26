import useFakeQuery from "@/hooks/useFakeQuery";
import { cn } from "@/lib/utils";
import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import { Swiper, SwiperSlide } from "swiper/react";

const sessions = [
  {
    week: "1",
    description: "Session 1",
    status: "Completed",
    attendedMembersCount: 10,
    totalMembers: 20,
    id: 1,
  },
  {
    week: "2",
    description: "Session 2",
    status: "Completed",
    attendedMembersCount: 15,
    totalMembers: 20,
    id: 2,
  },
  {
    week: "3",
    description: "Session 3",
    status: "Upcoming",
    attendedMembersCount: 5,
    totalMembers: 20,
    id: 3,
  },
  {
    week: "4",
    description: "Session 4",
    status: "Upcoming",
    attendedMembersCount: 0,
    totalMembers: 20,
    id: 4,
  },
  {
    week: "5",
    description: "Session 5",
    status: "Upcoming",
    attendedMembersCount: 0,
    totalMembers: 20,
    id: 5,
  },
  {
    week: "6",
    description: "Session 6",
    status: "Upcoming",
    attendedMembersCount: 0,
    totalMembers: 20,
    id: 6,
  },
];

export default function AttendanceSessions() {
  const [selectedSessionId, setSelectedSessionId] = useState(1);
  const query = useFakeQuery(sessions, { swapOnKeyPress: true });

  return (
    <div className="bg-white border border-border rounded-md p-4">
      <Swiper slidesPerView={"auto"} spaceBetween={16} width={100}>
        {query.isPending &&
          new Array(4).fill("x").map((_, i) => {
            return (
              <SwiperSlide className="!max-w-[20rem] ">
                <Skeleton key={i} height={"10rem"} />
              </SwiperSlide>
            );
          })}
        {query.data?.map((data, i) => {
          const isSelected = selectedSessionId === data.id;
          return (
            <SwiperSlide
              className={cn(
                "!max-w-[20rem] group border border-border p-4 rounded-md pb-2 hover:bg-highlight/5 hover:border-highlight !transition-all duration-200 cursor-pointer",
                isSelected &&
                  "bg-gradient-to-bl from-highlight-dark to-highlight"
              )}
              onClick={() => {
                setSelectedSessionId(data.id);
              }}
              key={i + "slide"}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center gap-3">
                  <i className="bx bx-user text-lg w-10 aspect-square rounded-full bg-border text-dark flex items-center justify-center"></i>
                  <p className={cn(isSelected && "text-border")}>
                    Session {data.week}
                  </p>
                </div>
                <p
                  className={cn(
                    "text-white bg-highlight rounded-full px-4 py-1",
                    isSelected && "bg-white text-highlight"
                  )}
                >
                  Completed
                </p>
              </div>
              <h2
                className={cn(
                  "font-semibold text-4xl mt-8",
                  isSelected && "text-white"
                )}
              >
                {data.attendedMembersCount}
                <span
                  className={cn(
                    "text-base text-light",
                    isSelected && "text-border"
                  )}
                >
                  / {data.totalMembers}
                </span>
              </h2>
              <p
                className={cn(
                  "text-light mb-2 mt-1",
                  isSelected && "text-border"
                )}
              >
                Members Attended
              </p>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
