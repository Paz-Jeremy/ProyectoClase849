import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import { RootStackParamList } from "../navigation/StackNavigator";
import { StatusBar } from "expo-status-bar";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../contexts/AuthContext";

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeScreen({route, navigation}: Props){
    //recepcion de email por medio de parametro de ruta
    // const { email } = route.params;

    //extraccion de usuario para email desde contexto
    const {user} = useAuth();


    const handleLoadSettings = () => {
        navigation.navigate('UserTabs');
    }
    return(
        <View>
            <StatusBar style="auto" />
          <Text> Hola {user?.email}, Bienvenido a Home </Text> 
          <CustomButton title={"Ir a User Settings"} onPress={handleLoadSettings}/>
        </View>
    )
}