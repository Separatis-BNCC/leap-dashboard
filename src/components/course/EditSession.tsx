import { useDialog } from "../general/Dialog";

export default function EditSession() {
  const { contextData } = useDialog();

  return <div className="bg-white">{contextData.title}</div>;
}
