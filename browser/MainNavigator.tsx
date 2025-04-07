import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreens from "../screens/WelcomeScreens";
import RegistroScreen from "../screens/RegistroScreen";
import Pantalla1Screens from "../screens/Pantalla1Screens";
import Pantalla2Screens from "../screens/Pantalla2Screens";
import Pantalla3Screens from "../screens/Pantalla3Screens";
import Pantalla4Screens from "../screens/Pantalla4Screens";

const Stack = createStackNavigator();
const Tabs = createMaterialTopTabNavigator();



function MyStack(){
    return(
        <Stack.Navigator>
            <Stack.Screen name="Welcome" component={WelcomeScreens}/>
            <Stack.Screen name="Registro" component={RegistroScreen}/>
            <Stack.Screen name="Tabs" component={MyTabs}/>
        </Stack.Navigator>

    )
}


function MyTabs (){
    return(
        <Tabs.Navigator>
            <Tabs.Screen name="Pantalla 1" component={Pantalla1Screens}/>
            <Tabs.Screen name="Pantalla 2" component={Pantalla2Screens}/>
            <Tabs.Screen name="Pantalla 3" component={Pantalla3Screens}/>
            <Tabs.Screen name="Pantalla 4" component={Pantalla4Screens}/>
        </Tabs.Navigator>
    )
}

export default function MainNavigator(){
    return(
        <NavigationContainer>
            <MyStack/>
        </NavigationContainer>
    )
}
