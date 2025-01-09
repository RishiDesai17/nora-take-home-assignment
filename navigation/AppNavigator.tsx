import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from '../screens/Search';
import TrackDetailsScreen from '../screens/TrackDetails';

const Stack = createStackNavigator();

const AppNavigator = () => (
    <NavigationContainer>
        <Stack.Navigator initialRouteName="Search" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Search" component={SearchScreen} />
            <Stack.Screen name="Track Details" component={TrackDetailsScreen} />
        </Stack.Navigator>
    </NavigationContainer>
);

export default AppNavigator;
