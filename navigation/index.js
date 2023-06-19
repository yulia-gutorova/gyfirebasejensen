import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import AddNewItemScreen from '../screens/AddNewItemScreen';
import HomeScreen from '../home/HomeScreen';
import LoginScreen from '../login/LoginScreen';
import CraftsScreen from '../screens/CraftsScreen';
import CraftDetailScreen from '../screens/CraftDetailScreen';

export default function Navigation() {

  const Stack = createNativeStackNavigator();


  return (

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">

            <Stack.Screen 
                        name="Login"
                        component={LoginScreen}
                        options={{headerShown: false}}
                        /> 
                <Stack.Screen 
                        name="AddNewItem"
                        component={AddNewItemScreen}
                        options={{headerShown: false}}
                        />  

                <Stack.Screen 
                        name="Home"
                        component={HomeScreen}
                        options={{headerShown: false}}
                        />     

                <Stack.Screen 
                        name="Crafts"
                        component={CraftsScreen}
                        options={{headerShown: false}}
                        />   

                <Stack.Screen 
                        name="CraftDetail"
                        component={CraftDetailScreen}
                        options={{headerShown: false}}
                        />              
      </Stack.Navigator>
    </NavigationContainer>
  );
}