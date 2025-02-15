import { useEffect } from "react";
import * as WebBrowser from "expo-web-browser";

// the hook is used to pre-load the in-app browser for android
export default function useWarmUpBrowser() {
  useEffect(() => {
    void WebBrowser.warmUpAsync();
    return () => {
      void WebBrowser.coolDownAsync();
    };
  }, []);
}
