import useTimePicker from "@/hooks/course/useTimePicker";

export default function TimePicker() {
  const { register, value } = useTimePicker({
    defaultValue: [0, 0],
    onChange: (value) => console.log(value),
  });

  return (
    <div className="flex gap-4">
      {value.map((val, i) => {
        return (
          <input
            className="border border-border h-12  w-12 rounded-md flex items-center justify-center text-center"
            key={i}
            {...register(val, i)}
          />
        );
      })}
    </div>
  );
}
