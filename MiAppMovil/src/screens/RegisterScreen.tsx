import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";

export default function RegisterScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const { register } = useAuth();
  const { colors, isDark } = useTheme();

  const handleRegister = async () => {
    if (!name.trim() || !phoneNumber.trim() || !email.trim() || !password.trim()) {
      Alert.alert("Campos obligatorios", "Todos los campos deben estar completos.");
      return;
    }

    try {
      await register(name.trim(), phoneNumber.trim(), email.trim(), password);
      navigation.navigate("Login");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo completar el registro.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.wrapper, { backgroundColor: colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <View
          style={[
            styles.card,
            {
              backgroundColor: isDark ? "#1E1E1E" : "#FFFFFF",
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.title, { color: colors.primary }]}>
            Crear cuenta
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Completa tus datos para registrarte
          </Text>

          <View style={styles.form}>
            <CustomInput
              placeholder="Ingresa tu nombre"
              value={name}
              onChange={setName}
            />

            <CustomInput
              type="number"
              placeholder="Ingresa tu número de teléfono"
              value={phoneNumber}
              onChange={setPhoneNumber}
            />

            <CustomInput
              type="email"
              placeholder="micorreo@gmail.com"
              value={email}
              onChange={setEmail}
            />

            <CustomInput
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={setPassword}
            />

            <CustomButton title="Registrar" onPress={handleRegister} />
            <CustomButton
              title="Volver al login"
              onPress={() => navigation.navigate("Login")}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  card: {
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },
  title: {
    fontSize: 30,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
  },
  form: {
    gap: 14,
  },
});