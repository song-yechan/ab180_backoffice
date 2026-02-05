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
import { Settings, Trash2, History } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DedupSetting, DedupLog } from "@/types";
import { formatDuration } from "@/lib/dedup";

interface CurrentSettingsTableProps {
  settings: DedupSetting[];
  logs: DedupLog[];
  onDelete?: (id: string) => void;
}

export function CurrentSettingsTable({
  settings,
  logs,
  onDelete,
}: CurrentSettingsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="h-5 w-5" />
          현재 설정
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Dedup Logs */}
        <div>
          <h4 className="text-sm font-medium flex items-center gap-2 mb-3">
            <History className="h-4 w-4" />
            중복 제거 로그
          </h4>
          {logs.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              중복 제거 로그가 없습니다.
            </p>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Dedup Key</TableHead>
                  <TableHead>중복 제거 수</TableHead>
                  <TableHead>시간</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id}>
                    <TableCell>
                      <code className="text-xs bg-muted px-1.5 py-0.5 rounded break-all">
                        {log.dedupKey.length > 60
                          ? `${log.dedupKey.slice(0, 60)}...`
                          : log.dedupKey}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">
                        {log.duplicateCount.toLocaleString()}건
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {new Date(log.timestamp).toLocaleString("ko-KR")}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>

        {/* Current Settings */}
        <div>
          <h4 className="text-sm font-medium mb-3">
            설정 목록 ({settings.length}개)
          </h4>
          {settings.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              등록된 중복 제거 설정이 없습니다.
            </p>
          ) : (
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
          )}
        </div>
      </CardContent>
    </Card>
  );
}
