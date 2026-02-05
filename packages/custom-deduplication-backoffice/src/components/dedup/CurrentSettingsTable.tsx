import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Settings, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DedupSetting } from "@/types";
import { formatDuration } from "@/lib/dedup";

interface CurrentSettingsTableProps {
  settings: DedupSetting[];
  onDelete?: (id: string) => void;
}

export function CurrentSettingsTable({
  settings,
  onDelete,
}: CurrentSettingsTableProps) {
  if (settings.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5" />
            현재 설정
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            등록된 중복 제거 설정이 없습니다.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="h-5 w-5" />
          현재 설정 ({settings.length}개)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Event Category</TableHead>
              <TableHead>Goal Category</TableHead>
              <TableHead>Dedup Key</TableHead>
              <TableHead>Dedup Window (sec)</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Updated At</TableHead>
              {onDelete && <TableHead className="w-[60px]"></TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {settings.map((setting) => (
              <TableRow key={setting.id}>
                <TableCell>
                  {setting.eventCategory ? (
                    <Badge variant="secondary">{setting.eventCategory}</Badge>
                  ) : (
                    <span className="text-muted-foreground">-</span>
                  )}
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded">
                    {setting.goalCategory}
                  </code>
                </TableCell>
                <TableCell>
                  <code className="text-xs bg-muted px-1.5 py-0.5 rounded break-all">
                    {setting.dedupKey.length > 60
                      ? `${setting.dedupKey.slice(0, 60)}...`
                      : setting.dedupKey}
                  </code>
                </TableCell>
                <TableCell>
                  <Badge variant="outline">
                    {setting.dedupWindow} ({formatDuration(setting.dedupWindow)})
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={setting.status === "ON" ? "default" : "secondary"}>
                    {setting.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(setting.createdAt).toLocaleString("ko-KR")}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {new Date(setting.updatedAt).toLocaleString("ko-KR")}
                </TableCell>
                {onDelete && (
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(setting.id)}
                      className="h-8 w-8 text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
