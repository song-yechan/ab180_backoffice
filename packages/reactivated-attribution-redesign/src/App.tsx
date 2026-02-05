import { Toaster } from '@/components/ui/sonner';
import { Header } from '@/components/layout/Header';
import { SettingsTab } from '@/components/settings/SettingsTab';
import { useSettings } from '@/hooks/useSettings';
import { mockAppInfo } from '@/data/mockData';

function App() {
  const {
    settings,
    updateInactivityWindow,
    disableInactivityWindow,
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
        <SettingsTab
          settings={settings}
          onUpdateInactivityWindow={updateInactivityWindow}
          onDisableInactivityWindow={disableInactivityWindow}
          onUpdateLookbackWindow={updateLookbackWindow}
          onAddLookbackWindowChannel={addLookbackWindowChannel}
          onRemoveLookbackWindowChannel={removeLookbackWindowChannel}
          onUpdateAttributionWindow={updateAttributionWindow}
          onAddAttributionWindowChannel={addAttributionWindowChannel}
          onRemoveAttributionWindowChannel={removeAttributionWindowChannel}
        />
      </main>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
