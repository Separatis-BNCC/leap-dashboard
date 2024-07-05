export type ServerErrorResponse = {
  msg: string;
  status: number;
};

export type ServerSuccessResponse<Data> = {
  status: number;
  msg: "Success";
  data: Data;
};

export type Session = { id: string; title: string; outlineCount: number };

export type UserData = {
  id: string;
  email: string;
  role: number;
  profile?: {
    birth_date: string;
    faculty: number;
    first_name: string;
    last_name: string;
    line_id: string;
    major: number;
    nim: string;
    region: number;
  };
};

export type Course = {
  display: string;
  sessions: {
    title: string;
    outlineCount: number;
    id: number;
  }[];
  class: {
    name: string;
    praetorian: string;
    memberCount: number;
    rescheduledCount?: number;
  }[];
};

export type CourseList = Record<string, Course>;
