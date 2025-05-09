import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import "./style.css";
import { Storage } from "@/types";

const App = () => {
  const [settings, setSettings] = useState<Record<string, boolean>>({
    isEnabled: true,
    isAutoSkipEnabled: true,
  });

  useEffect(() => {
    const getSettings = async () => {
      const settings = (await browser.storage.sync.get([
        Storage.IS_ENABLED,
        Storage.IS_SV_PLAYLIST_ENABLED,
        Storage.IS_AUTO_SKIP_ENABLED,
      ])) as Record<Storage, boolean>;

      setSettings({
        isEnabled: settings.isEnabled ?? true,
        isSVPlaylistEnabled: settings.isSVPlaylistEnabled ?? true,
        isAutoSkipEnabled: settings.isAutoSkipEnabled ?? true,
      });
    };

    getSettings();
  }, []);

  const handleSwitchChange = (name: Storage) => async (checked: boolean) => {
    setSettings((prev) => ({ ...prev, [name]: checked }));
    await browser.storage.sync.set({ [name]: checked });
  };

  return (
    <div className="max-w-[668px] mx-auto my-10 px-4">
      <h1 className="text-2xl font-medium">Customize your experience</h1>

      <div className="grid gap-y-4 mt-6">
        <label className="flex items-center gap-4">
          <Switch
            name={Storage.IS_ENABLED}
            id={Storage.IS_ENABLED}
            checked={settings.isEnabled}
            onCheckedChange={handleSwitchChange(Storage.IS_ENABLED)}
          />
          <span className="text-sm">Enable StealthView</span>
        </label>

        <label className="flex items-center gap-4">
          <Switch
            name={Storage.IS_SV_PLAYLIST_ENABLED}
            id={Storage.IS_SV_PLAYLIST_ENABLED}
            checked={settings.isEnabled ? settings.isSVPlaylistEnabled : false}
            onCheckedChange={handleSwitchChange(Storage.IS_SV_PLAYLIST_ENABLED)}
            disabled={!settings.isEnabled}
          />
          <span className="text-sm">Enable StealthView Playlist</span>
        </label>

        <label className="flex items-center gap-4">
          <Switch
            name={Storage.IS_AUTO_SKIP_ENABLED}
            id={Storage.IS_AUTO_SKIP_ENABLED}
            checked={settings.isEnabled ? settings.isAutoSkipEnabled : false}
            onCheckedChange={handleSwitchChange(Storage.IS_AUTO_SKIP_ENABLED)}
            disabled={!settings.isEnabled}
          />
          <span className="text-sm">Auto skip ads</span>
        </label>
      </div>
    </div>
  );
};

export default App;
