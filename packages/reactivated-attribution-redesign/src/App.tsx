import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/layout/Header';
import { PageTabs } from '@/components/layout/PageTabs';
import { OverviewTab } from '@/components/overview/OverviewTab';
import { SettingsTab } from '@/components/settings/SettingsTab';
import { useSettings } from '@/hooks/useSettings';
import { mockAppInfo } from '@/data/mockData';

function App() {
  const {
    settings,
    updateInactivityWindow,
    updateLookbackWindow,
    addLookbackWindowChannel,
    removeLookbackWindowChannel,
    updateAttributionWindow,
    addAttributionWindowChannel,
    removeAttributionWindowChannel,
  } = useSettings();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header appInfo={mockAppInfo} />
      <main className="container mx-auto px-4 py-6">
        <PageTabs
          overviewContent={<OverviewTab settings={settings} />}
          settingsContent={
            <SettingsTab
              settings={settings}
              onUpdateInactivityWindow={updateInactivityWindow}
              onUpdateLookbackWindow={updateLookbackWindow}
              onAddLookbackWindowChannel={addLookbackWindowChannel}
              onRemoveLookbackWindowChannel={removeLookbackWindowChannel}
              onUpdateAttributionWindow={updateAttributionWindow}
              onAddAttributionWindowChannel={addAttributionWindowChannel}
              onRemoveAttributionWindowChannel={removeAttributionWindowChannel}
            />
          }
        />
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
