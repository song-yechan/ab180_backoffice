import { useState } from "react";
import { Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { AppInfo, DedupSetting } from "@/types";
import { MOCK_APPS } from "@/data/mock";

interface AppSearchSectionProps {
  appInfo: AppInfo | null;
  currentSettings: DedupSetting[];
  onAppChange: (app: AppInfo | null) => void;
  onRefresh: () => void;
}

export function AppSearchSection({
  appInfo,
  currentSettings,
  onAppChange,
  onRefresh,
}: AppSearchSectionProps) {
  const [appId, setAppId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    if (!appId.trim()) return;

    setIsLoading(true);
    // Mock API 호출 시뮬레이션
    setTimeout(() => {
      const foundApp = MOCK_APPS[appId.trim()];
      onAppChange(foundApp || null);
      setIsLoading(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Search className="h-5 w-5" />
          App 검색
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <div className="flex-1">
            <Label htmlFor="appId" className="sr-only">
              App ID
            </Label>
            <Input
              id="appId"
              placeholder="App ID를 입력하세요 (예: 12345)"
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          <Button onClick={handleSearch} disabled={isLoading || !appId.trim()}>
            {isLoading ? "검색 중..." : "검색"}
          </Button>
        </div>

        {appInfo && (
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-3">
                {appInfo.iconUrl && (
                  <img
                    src={appInfo.iconUrl}
                    alt={appInfo.name}
                    className="w-10 h-10 rounded-lg"
                  />
                )}
                <div>
                  <p className="font-medium">{appInfo.name}</p>
                  <p className="text-sm text-muted-foreground">
                    ID: {appInfo.id} | Timezone: {appInfo.timezone}
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm" onClick={onRefresh}>
                <RefreshCw className="h-4 w-4 mr-1" />
                Refresh
              </Button>
            </div>

            {/* App Status Summary */}
            <div className="p-4 border rounded-lg">
              <h4 className="text-sm font-medium mb-2">Custom Deduplication 상태</h4>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">총 설정:</span>
                  <Badge variant="secondary">{currentSettings.length}개</Badge>
                </div>
              </div>
            </div>
          </div>
        )}

        {appId && !appInfo && !isLoading && (
          <p className="text-sm text-muted-foreground">
            해당 App ID를 찾을 수 없습니다. (테스트: 12345, 67890)
          </p>
        )}
      </CardContent>
    </Card>
  );
}
