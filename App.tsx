import { GluestackUIProvider } from "@/gluestack/ui/gluestack-ui-provider";
import "@/global.css";
import { View, StyleSheet } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from '@/context/FavoritesContext';

const App = () => {
  return (
    <GluestackUIProvider>
      <Provider>
        <SafeAreaView style={styles.safeAreaView}>
          <View style={styles.viewBox}>
            <AppNavigator />
          </View>
        </SafeAreaView>
      </Provider>
    </GluestackUIProvider>
  );
}

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1
  },
  viewBox: {
    backgroundColor: "#121212",
    flex: 1
  }
});

export default App;
