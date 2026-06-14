import { useState } from "react";
import { View, Text, StyleSheet, Alert } from "react-native";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import ScreenWrapper from "../components/ScreenWrapper";
import { useAuth } from "../contexts/AuthContext";
import { i18n } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("jeremyjosecastellanos@gmail.com");
  const [password, setPassword] = useState("");

  const { login } = useAuth();
  const { colors, isDark } = useTheme();

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert("Campos obligatorios", "Ingresa tu correo y contraseña.");
      return;
    }

    try {
      const success = await login(email.trim(), password);

      if (!success) return;

      navigation.navigate("MainTabs");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "No se pudo iniciar sesión.");
    }
  };

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: colors.background }]}>
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
            {i18n.t("signIn")}
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Accede a tu cuenta para continuar
          </Text>

          <View style={styles.form}>
            <CustomInput
              type="email"
              placeholder="Ingresa tu correo"
              value={email}
              onChange={setEmail}
            />

            <CustomInput
              type="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={setPassword}
            />

            <CustomButton title={i18n.t("signIn")} onPress={handleLogin} />
            <CustomButton
              title="Registrarse"
              onPress={() => navigation.navigate("Register")}
            />
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
