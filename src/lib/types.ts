export type ServerErrorResponse = {
  msg: string;
  status: number;
};

export type ServerSuccessResponse<Data = unknown> = {
  status: number;
  msg: "Success";
  data: Data;
};

export type Content = {
  content_type: string;
  desc: string;
  id: number;
  url: string;
};

export type Session = {
  id: number;
  week: number;
  description: string;
  status: number;
  contents: Content[];

  // DEPRECATED
  // ContentCount: number;
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
  day_of_week: number;
  hour: number;
  minute: number;
  sessions: Session[];

  // TBA
  members: UserData[];
  praetorian: string;
  memberCount: number;
  rescheduledCount?: number;
};

export type CourseList = Record<string, Course>;

export type Region = {
  id: number;
  label: string;
};
