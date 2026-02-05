import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { UnitSelect } from '@/components/common/UnitSelect';
import { InfoTooltip } from '@/components/common/InfoTooltip';
import type { WindowPeriod, TimeUnit } from '@/types';
import { toast } from 'sonner';

interface InactivityWindowProps {
  value: WindowPeriod | null;
  onSave: (period: WindowPeriod) => void;
}

export function InactivityWindow({ value, onSave }: InactivityWindowProps) {
  const [localValue, setLocalValue] = useState<number>(value?.value ?? 7);
  const [localUnit, setLocalUnit] = useState<TimeUnit>(value?.unit ?? 'days');
  const [isDirty, setIsDirty] = useState(false);

  const handleValueChange = (newValue: string) => {
    const num = parseInt(newValue, 10);
    if (!isNaN(num) && num > 0) {
      setLocalValue(num);
      setIsDirty(true);
    }
  };

  const handleUnitChange = (newUnit: TimeUnit) => {
    setLocalUnit(newUnit);
    setIsDirty(true);
  };

  const handleSave = () => {
    onSave({ value: localValue, unit: localUnit });
    setIsDirty(false);
    toast.success('Inactivity Window가 저장되었습니다.');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-sm font-medium text-primary-foreground">
            1
          </span>
          Inactivity Window
          <span className="ml-1 rounded bg-red-100 px-1.5 py-0.5 text-xs font-medium text-red-700">
            필수
          </span>
          <InfoTooltip content="유저가 앱을 사용하지 않은 것으로 판단하는 기간입니다. 이 기간이 지난 후 앱을 사용하면 Reactivation으로 인식됩니다." />
        </CardTitle>
        <CardDescription>
          비활성 유저 판단 기준 기간을 설정하세요.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {!value && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription>
              Inactivity Window가 설정되지 않으면 Reactivation Tracking이 동작하지 않습니다.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex items-center gap-3">
          <Input
            type="number"
            min={1}
            value={localValue}
            onChange={(e) => handleValueChange(e.target.value)}
            className="w-24"
          />
          <UnitSelect value={localUnit} onChange={handleUnitChange} />
          <Button onClick={handleSave} disabled={!isDirty}>
            저장
          </Button>
          {isDirty && (
            <span className="text-sm text-muted-foreground">변경사항이 있습니다</span>
          )}
        </div>

        <div className="mt-4 rounded-md bg-muted p-3 text-sm">
          <p className="font-medium">기본값 안내</p>
          <p className="text-muted-foreground">
            일반적으로 7일을 권장합니다. 앱 특성에 따라 조정하세요.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
