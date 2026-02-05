"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Priority } from "@/types/task";

interface PrioritySelectProps {
  value: Priority;
  onChange: (value: Priority) => void;
  disabled?: boolean;
}

export function PrioritySelect({
  value,
  onChange,
  disabled,
}: PrioritySelectProps) {
  const getPriorityColorClass = (priority: Priority) => {
    switch (priority) {
      case Priority.VERY_HIGH:
        return "bg-red-100 text-red-800";
      case Priority.HIGH:
        return "bg-orange-100 text-orange-800";
      case Priority.MEDIUM:
        return "bg-yellow-100 text-yellow-800";
      case Priority.LOW:
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formattedValue = value || Priority.MEDIUM;

  return (
    <Select value={formattedValue} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger
        className={`w-[140px] border-none h-8 ${getPriorityColorClass(
          formattedValue,
        )}`}
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={Priority.VERY_HIGH} className="text-red-800">
          Very High
        </SelectItem>
        <SelectItem value={Priority.HIGH} className="text-orange-800">
          High
        </SelectItem>
        <SelectItem value={Priority.MEDIUM} className="text-yellow-800">
          Medium
        </SelectItem>
        <SelectItem value={Priority.LOW} className="text-green-800">
          Low
        </SelectItem>
        <SelectItem value={Priority.VERY_LOW} className="text-gray-800">
          Very Low
        </SelectItem>
      </SelectContent>
    </Select>
  );
}
