import "@/global.css";
import { GluestackUIProvider } from "@/gluestack/ui/gluestack-ui-provider";
import AppNavigator from './navigation/AppNavigator';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <GluestackUIProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <AppNavigator />
      </SafeAreaView>
    </GluestackUIProvider>
  );
}

