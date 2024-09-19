import useTimePicker from "@/hooks/course/useTimePicker";

type Props = {
  onChange: (value: number[]) => void;
  value: number[];
};

export default function TimePicker({ onChange, value }: Props) {
  const { register, inputs } = useTimePicker({
    defaultValue: [0, 0],
    value,
    onChange,
  });

  return (
    <div className="grid grid-cols-2 gap-4">
      {inputs.map((val, i) => {
        return (
          <div key={i}>
            <p className="text-center text-light mb-1">
              {i === 0 ? "Hour" : "Min"}
            </p>
            <input
              className="border border-border w-full h-10 rounded-md flex items-center justify-center text-center"
              {...register(val, i)}
            />
          </div>
        );
      })}
    </div>
  );
}
