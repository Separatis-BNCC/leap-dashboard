export type ServerErrorResponse = {
  msg: string;
  status: number;
};

export type ServerSuccessResponse<Data> = {
  status: number;
  msg: "Success";
  data: Data;
};
