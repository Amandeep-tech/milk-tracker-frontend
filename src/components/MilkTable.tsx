import { MilkEntry } from "@/types/apiResponseTypes";
import Link from "next/link";
import Shimmer from "./basic/shimmer";

export default function MilkTable({
  entries,
  onDelete,
  isLoading,
}: {
  entries: MilkEntry[];
  onDelete: (id: number) => void;
  isLoading?: boolean;
}) {
  return (
    <table className="w-full text-sm overflow-x-auto border-collapse border border-gray-300 rounded-md">
      <thead>
        <tr className="bg-gray-100">
          <th className="p-2 border border-gray-300 min-w-[100px]">Date</th>
          <th className="p-2 border border-gray-300">Quantity</th>
          <th className="p-2 border border-gray-300">Rate</th>
          <th className="p-2 border border-gray-300">Total Amount</th>
          <th className="p-2 border border-gray-300 min-w-[100px]">Edit</th>
          <th className="p-2 border border-gray-300 min-w-[100px]">Delete</th>
        </tr>
      </thead>
      <tbody>
        {isLoading && (
          <tr>
            {Array.from({ length: 5 }).map((_, index) => (
              <td key={index} className="p-2 border border-gray-300">
                <Shimmer width="50px" height="20px" />
              </td>
            ))}
          </tr>
        )}
        {!isLoading && entries?.length === 0 && (
          <tr>
            <td colSpan={5} className="text-center p-4">
              No entries found
            </td>
          </tr>
        )}
        {entries?.map((entry: MilkEntry) => (
          <tr key={entry.id} className="border-b min-h-[80px]">
            <td className="p-2 border border-gray-300 text-nowrap">
              {new Date(entry.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </td>
            <td className="p-2 border border-gray-300 text-center">{entry.quantity}</td>
            <td className="p-2 border border-gray-300 text-center">{entry.rate}</td>
            <td className="p-2 border border-gray-300 text-center">{entry.total}</td>
            <td className="p-2 border border-gray-300 text-center">
              <Link
                href={`/edit/${entry.id}`}
                className="text-blue-600 border border-blue-600 rounded-md px-2 py-1"
              >
                Edit
              </Link>
            </td>
            <td className="p-2 border border-gray-300">
              <button
                onClick={() => onDelete(entry.id)}
                className="text-red-600 border border-red-600 rounded-md px-2 py-1"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
