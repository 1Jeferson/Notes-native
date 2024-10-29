import { initializeDatabase } from "@/database/initializeDatabase";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
  return (
    <GestureHandlerRootView>
      <SQLiteProvider
        databaseName="notesNatibe.db"
        onInit={initializeDatabase}
      >
        <Slot />
      </SQLiteProvider>
    </GestureHandlerRootView>
  );
}
