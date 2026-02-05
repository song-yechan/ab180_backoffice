import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { TimeUnit } from '@/types';

interface UnitSelectProps {
  value: TimeUnit;
  onChange: (value: TimeUnit) => void;
  disabled?: boolean;
}

export function UnitSelect({ value, onChange, disabled }: UnitSelectProps) {
  return (
    <Select value={value} onValueChange={onChange} disabled={disabled}>
      <SelectTrigger className="w-24">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="days">일</SelectItem>
        <SelectItem value="hours">시간</SelectItem>
      </SelectContent>
    </Select>
  );
}
