import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { EventType, Platform } from "@/types";
import { generateDedupKey, formatDuration } from "@/lib/dedup";

interface PreviewSectionProps {
  platforms: Platform[];
  eventType: EventType | null;
  dedupWindow: number;
}

export function PreviewSection({
  platforms,
  eventType,
  dedupWindow,
}: PreviewSectionProps) {
  const isValid = platforms.length > 0 && eventType !== null;
  const dedupKey = isValid ? generateDedupKey(platforms, eventType!) : null;

  const handleCopy = () => {
    if (dedupKey) {
      navigator.clipboard.writeText(dedupKey);
      toast.success("Dedup Key가 클립보드에 복사되었습니다.");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Eye className="h-5 w-5" />
          2. 확인
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {!isValid ? (
          <p className="text-sm text-muted-foreground">
            Platform과 Event Type을 선택하면 생성될 Dedup Key가 표시됩니다.
          </p>
        ) : (
          <>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Platform:</span>
                {platforms.map((p) => (
                  <Badge key={p} variant="secondary">
                    {p.toUpperCase()}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Event:</span>
                <Badge variant="outline">{eventType?.label}</Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Window:</span>
                <Badge variant="outline">{formatDuration(dedupWindow)}</Badge>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">생성될 Dedup Key:</span>
                <Button variant="ghost" size="sm" onClick={handleCopy}>
                  <Copy className="h-4 w-4 mr-1" />
                  복사
                </Button>
              </div>
              <div className="p-3 bg-muted rounded-lg">
                <code className="text-xs break-all whitespace-pre-wrap">
                  {dedupKey}
                </code>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
