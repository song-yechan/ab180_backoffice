import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { UnitSelect } from '@/components/common/UnitSelect';
import type { WindowPeriod, TimeUnit, AttributionWindowSettings } from '@/types';
import { availableChannels, formatPeriodShort, defaultAttributionSettings } from '@/data/mockData';
import { toast } from 'sonner';

interface ChannelData {
  channel: string;
  settings: AttributionWindowSettings;
}

interface AttributionTableProps {
  data: ChannelData[];
  onUpdate: (index: number, updates: Partial<AttributionWindowSettings>) => void;
  onAdd: (channel: ChannelData) => void;
  onRemove: (index: number) => void;
}

export function AttributionTable({ data, onUpdate, onAdd, onRemove }: AttributionTableProps) {
  const [editingRow, setEditingRow] = useState<number | null>(null);
  const [editValue, setEditValue] = useState<number>(0);
  const [editUnit, setEditUnit] = useState<TimeUnit>('days');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newChannel, setNewChannel] = useState('');

  const usedChannels = data.map((d) => d.channel);
  const availableToAdd = availableChannels.filter((c) => !usedChannels.includes(c));

  const handleCellClick = (rowIndex: number, currentValue: WindowPeriod) => {
    if (data[rowIndex].channel === 'Global') {
      return;
    }
    setEditingRow(rowIndex);
    setEditValue(currentValue.value);
    setEditUnit(currentValue.unit);
  };

  const handleSave = () => {
    if (editingRow !== null) {
      onUpdate(editingRow, {
        attributionWindow: { value: editValue, unit: editUnit },
      });
      setEditingRow(null);
      toast.success('설정이 업데이트되었습니다.');
    }
  };

  const handleCancel = () => {
    setEditingRow(null);
  };

  const handleAddChannel = () => {
    if (newChannel) {
      onAdd({
        channel: newChannel,
        settings: { ...defaultAttributionSettings },
      });
      setNewChannel('');
      setIsAddDialogOpen(false);
      toast.success(`${newChannel} 채널이 추가되었습니다.`);
    }
  };

  const handleRemoveChannel = (index: number) => {
    if (data[index].channel === 'Global') {
      toast.error('Global 설정은 삭제할 수 없습니다.');
      return;
    }
    onRemove(index);
    toast.success('채널 설정이 삭제되었습니다.');
  };

  const renderCell = (rowIndex: number, value: WindowPeriod) => {
    const isEditing = editingRow === rowIndex;
    const isGlobalProtected = data[rowIndex].channel === 'Global';

    if (isEditing) {
      return (
        <div className="flex items-center gap-2">
          <Input
            type="number"
            min={1}
            value={editValue}
            onChange={(e) => setEditValue(parseInt(e.target.value, 10) || 1)}
            className="w-16 h-8"
            autoFocus
          />
          <UnitSelect value={editUnit} onChange={setEditUnit} />
          <Button size="sm" variant="ghost" onClick={handleSave}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </Button>
          <Button size="sm" variant="ghost" onClick={handleCancel}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </Button>
        </div>
      );
    }

    return (
      <button
        type="button"
        onClick={() => handleCellClick(rowIndex, value)}
        className={`rounded px-2 py-1 text-left transition-colors ${
          isGlobalProtected
            ? 'cursor-default bg-muted text-muted-foreground'
            : 'hover:bg-accent'
        }`}
        disabled={isGlobalProtected}
      >
        {formatPeriodShort(value)}
      </button>
    );
  };

  return (
    <div className="space-y-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[150px]">Channel</TableHead>
              <TableHead>Attribution Window</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row, index) => (
              <TableRow key={row.channel}>
                <TableCell className="font-medium">
                  {row.channel === 'Global' ? (
                    <span className="flex items-center gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-green-500" />
                      {row.channel}
                    </span>
                  ) : (
                    row.channel
                  )}
                </TableCell>
                <TableCell>
                  {renderCell(index, row.settings.attributionWindow)}
                </TableCell>
                <TableCell>
                  {row.channel !== 'Global' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveChannel(index)}
                      className="text-destructive hover:text-destructive"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M3 6h18" />
                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      </svg>
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogTrigger asChild>
          <Button variant="outline" disabled={availableToAdd.length === 0}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            채널 추가
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>채널 추가</DialogTitle>
            <DialogDescription>
              새로운 채널에 대한 Attribution Window를 설정합니다. 기본값(7일)이 적용되며, 이후 수정할 수 있습니다.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Select value={newChannel} onValueChange={setNewChannel}>
              <SelectTrigger>
                <SelectValue placeholder="채널 선택" />
              </SelectTrigger>
              <SelectContent>
                {availableToAdd.map((channel) => (
                  <SelectItem key={channel} value={channel}>
                    {channel}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              취소
            </Button>
            <Button onClick={handleAddChannel} disabled={!newChannel}>
              추가
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="text-sm text-muted-foreground">
        <p>셀을 클릭하여 직접 수정할 수 있습니다. Global 설정은 기본값으로 사용됩니다.</p>
      </div>
    </div>
  );
}
