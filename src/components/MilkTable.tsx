import { MilkEntry } from "@/types/apiResponseTypes";
import Button from "./basic/button";
import { useRouter } from "next/navigation";

export default function MilkTable({
  entries,
  onDelete,
}: {
  entries: MilkEntry[];
  onDelete: (id: number) => void;
}) {
  const router = useRouter();
  return (
    <table className="w-full text-sm overflow-x-auto border-collapse border border-gray-300 rounded-md">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border border-gray-300 min-w-[100px]">Date</th>
          <th className="p-2 border border-gray-300">Quantity</th>
          <th className="p-2 border border-gray-300">Rate</th>
          <th className="p-2 border border-gray-300">Total</th>
          <th className="p-2 border border-gray-300 min-w-[100px]">Actions</th>
        </tr>
      </thead>
      <tbody>
        {entries?.map((entry: MilkEntry) => (
          <tr key={entry.id} className="border-b min-h-[80px]">
            {/* date should be in the format - 19 July 2025 */}
            <td className="p-2 border border-gray-300 text-nowrap">
              {new Date(entry.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </td>
            <td className="p-2 border border-gray-300">{entry.quantity}</td>
            <td className="p-2 border border-gray-300">{entry.rate}</td>
            <td className="p-2 border border-gray-300">{entry.total}</td>
            <td>
              <div className="flex items-center flex-col gap-2 p-4">
                <Button variant="primary" size="md" onClick={() => router.push(`/edit/${entry.id}`)} text="Edit" />
                <Button variant="danger" size="md" onClick={() => onDelete(entry.id)} text="Delete" />
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
