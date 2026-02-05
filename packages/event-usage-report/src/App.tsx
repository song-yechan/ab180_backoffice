import { Toaster } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { PageHeader } from '@/components/layout/PageHeader';
import { AppBar } from '@/components/layout/AppBar';
import { CollectionStatusSection } from '@/components/sections/CollectionStatusSection';
import { EventUsageSection } from '@/components/sections/EventUsageSection';
import { Separator } from '@/components/ui/separator';
import { mockApp } from '@/data/mock';

function App() {
  return (
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <div className="max-w-[1080px] mx-auto px-6 py-8 pb-20">
          <PageHeader />
          <Separator className="my-6" />
          <AppBar app={mockApp} />
          <CollectionStatusSection />
          <Separator className="my-6" />
          <EventUsageSection />
        </div>
      </div>
      <Toaster position="bottom-right" />
    </TooltipProvider>
  );
}

export default App;
