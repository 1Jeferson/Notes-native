import { useSQLiteContext } from "expo-sqlite";
import { Alert } from "react-native";

export type PostDatabase = {
  id: number;
  title: string;
  content: string;
  date?: string;
};

export function usePostsDatabase() {
  const database = useSQLiteContext();

  async function create(data: Omit<PostDatabase, "id" | "date">) {
    if (!data.title || data.title.trim() === "") {
      Alert.alert("Preencha os campos");
      return;
    }

    const statement = await database.prepareAsync(
      "INSERT INTO posts (title, content) VALUES ($title, $content)"
    );

    try {
      const result = await statement.executeAsync({
        $title: data.title,
        $content: data.content,
      });

      const insertRowId = result.lastInsertRowId.toLocaleString();

      return { insertRowId };
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function searchByTitle(title: string) {
    try {
      const query = "SELECT * FROM posts WHERE title LIKE ?";
      const response = await database.getAllAsync<PostDatabase>(
        query,
        `%${title}%`
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async function update(data: PostDatabase) {
    const statement = await database.prepareAsync(
      "UPDATE posts SET title = $title, content = $content WHERE id = $id"
    );

    try {
      await statement.executeAsync({
        $id: data.id,
        $title: data.title,
        $content: data.content,
      });
    } catch (error) {
      throw error;
    } finally {
      await statement.finalizeAsync();
    }
  }

  async function remove(id: number) {
    try {
      await database.execAsync("DELETE FROM posts WHERE id = " + id);
    } catch (error) {
      throw error;
    }
  }

  async function show(id: number) {
    try {
      const query = "SELECT * FROM  posts WHERE id = ?";
      const response = await database.getFirstAsync<PostDatabase>(query, [id]);

      return response;
    } catch (error) {
      throw error;
    }
  }

  return { create, searchByTitle, update, remove, show };
}
