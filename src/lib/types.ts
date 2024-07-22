export type ServerErrorResponse = {
  msg: string;
  status: number;
};

export type ServerSuccessResponse<Data> = {
  status: number;
  msg: "Success";
  data: Data;
};

export type Session = {
  id: number;
  week: number;
  description: string;
  status: number;

  // DEPRECATED
  outlineCount: number;
};

export type UserData = {
  id: number;
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
  id: number;
  name: string;
  region: number;
  status: number;

  // DEPRECATED
  display: string;
  sessions: Session[];
  classes: Classes[];
};

export type Classes = {
  id: number;
  name: string;
  status: number;
  // Ini typenya apa ya??
  day_of_week: unknown;
  hour: number;
  minute: number;

  // TBA
  members: { active: boolean; email: string; id: number; role: number }[];
  praetorian: string;
  memberCount: number;
  rescheduledCount?: number;
};

export type CourseList = Record<string, Course>;

export type Region = {
  id: number;
  label: string;
};
