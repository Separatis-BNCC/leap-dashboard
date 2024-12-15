import Calendar from "@/components/Calendar";

export default function Schedule() {
  return (
    <div className="flex items-center justify-center">
      <Calendar.Container>
        <Calendar.Navigator type="next">Next</Calendar.Navigator>
        <Calendar.Navigator type="prev">Prev</Calendar.Navigator>
        <Calendar.Body
          className="gap-4"
          renderRemainder={({ value }) => {
            return <div className="text-light">{value}</div>;
          }}
          render={({ value }) => {
            return <div>{value}</div>;
          }}
        />
      </Calendar.Container>
    </div>
  );
}
