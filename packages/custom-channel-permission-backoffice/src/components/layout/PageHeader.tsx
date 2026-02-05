import { Shield } from "lucide-react";

export function PageHeader() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-3">
          <Shield className="h-8 w-8 text-primary" />
          <div>
            <h1 className="text-xl font-bold">Custom Channel Permission</h1>
            <p className="text-sm text-muted-foreground">
              대행사의 커스텀 채널 캠페인 권한을 관리합니다
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
