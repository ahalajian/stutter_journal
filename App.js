import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import EntryScreen from './screens/EntryScreen';
import GeneratorScreen from './screens/GeneratorScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="New Entry" component={EntryScreen} />
        <Stack.Screen name="Generator" component={GeneratorScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
