import { PageHeader } from "@/components/layout/PageHeader";
import { DeduplicationGuide } from "@/components/guide/DeduplicationGuide";
import { AppSearchSection } from "@/components/dedup/AppSearchSection";
import { CurrentSettingsTable } from "@/components/dedup/CurrentSettingsTable";
import { ConditionSelector } from "@/components/dedup/ConditionSelector";
import { PreviewSection } from "@/components/dedup/PreviewSection";
import { ActionButtons } from "@/components/dedup/ActionButtons";
import { Toaster } from "@/components/ui/sonner";
import { Separator } from "@/components/ui/separator";
import { useDedupForm } from "@/hooks/useDedupForm";

function App() {
  const {
    appInfo,
    currentSettings,
    dedupLogs,
    formState,
    isApplying,
    isFormValid,
    handleAppChange,
    handleRefresh,
    handlePlatformsChange,
    handleEventTypeChange,
    handleDedupWindowChange,
    handleDeleteSetting,
    handleApply,
  } = useDedupForm();

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-4xl">
        <PageHeader
          title="Custom Deduplication Backoffice"
          description="이벤트 커스텀 중복 제거 설정 관리"
        />

        <DeduplicationGuide />

        <div className="space-y-6">
          {/* App 검색 */}
          <AppSearchSection
            appInfo={appInfo}
            currentSettings={currentSettings}
            onAppChange={handleAppChange}
            onRefresh={handleRefresh}
          />

          {appInfo && (
            <>
              {/* 현재 설정 */}
              <CurrentSettingsTable
                settings={currentSettings}
                logs={dedupLogs}
                onDelete={handleDeleteSetting}
              />

              <Separator className="my-8" />

              {/* 새 설정 추가 */}
              <div className="space-y-6">
                <ConditionSelector
                  platforms={formState.platforms}
                  eventType={formState.eventType}
                  dedupWindow={formState.dedupWindow}
                  onPlatformsChange={handlePlatformsChange}
                  onEventTypeChange={handleEventTypeChange}
                  onDedupWindowChange={handleDedupWindowChange}
                />

                <PreviewSection
                  appId={appInfo.id}
                  platforms={formState.platforms}
                  eventType={formState.eventType}
                  dedupWindow={formState.dedupWindow}
                />

                <ActionButtons
                  onApply={handleApply}
                  isLoading={isApplying}
                  disabled={!isFormValid}
                />
              </div>
            </>
          )}
        </div>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}

export default App;
