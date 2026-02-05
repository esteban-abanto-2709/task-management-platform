"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TaskStatus } from "@/types/task";

interface StatusSelectProps {
  value: TaskStatus;
  onChange: (value: TaskStatus) => void;
  disabled?: boolean;
}

export function StatusSelect({ value, onChange, disabled }: StatusSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-[140px] h-8">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={TaskStatus.TODO}>Todo</SelectItem>
        <SelectItem value={TaskStatus.DOING}>Doing</SelectItem>
        <SelectItem value={TaskStatus.DONE}>Done</SelectItem>
      </SelectContent>
    </Select>
  );
}
