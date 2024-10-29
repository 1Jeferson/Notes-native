import { PostDatabase, usePostsDatabase } from "@/database/usePostsDatabase";
import BottomSheet from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useRef, useState } from "react";
import { Alert } from "react-native";
import { SwipeableMethods } from "react-native-gesture-handler/ReanimatedSwipeable";

export function usePost() {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [search, setSearch] = useState("");
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState<PostDatabase[]>([]);
  const openSwipeableRef = useRef<SwipeableMethods | null>(null);
  const postDatabase = usePostsDatabase();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  const resetForm = () => {
    setId("");
    setTitle("");
    setContent("");
  };

  const handleClosePress = () => {
    resetForm();
    bottomSheetRef.current?.close();
    setIsBottomSheetOpen(false);
  };

  const handleOpenPress = () => {
    bottomSheetRef.current?.expand();
    setIsBottomSheetOpen(true);
  };

  function closePreviousSwipeable(
    direction: "left" | "right",
    open: SwipeableMethods | null
  ) {
    if (direction === "left") {
      console.warn("REMOVER");
    }
    if (openSwipeableRef.current) {
      openSwipeableRef.current.close();
    }
    openSwipeableRef.current = open;
  }

  async function create() {
    try {
      if (!title.trim()) {
        return Alert.alert("Precisa de um título");
      }
      await postDatabase.create({
        title,
        content,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function update() {
    try {
      if (!title.trim() || !content.trim()) {
        return Alert.alert("Erro", "Título e conteúdo não podem estar vazios!");
      }
      await postDatabase.update({
        id: Number(id),
        title,
        content,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async function list() {
    try {
      const response = await postDatabase.searchByTitle(search);
      setPosts(response);
    } catch (error) {
      console.log(error);
    }
  }

  function details(item: PostDatabase) {
    setId(String(item.id));
    setTitle(item.title);
    setContent(item.content);
  }

  async function remove(id: number) {
    try {
      await postDatabase.remove(id);
      await list();
    } catch (error) {
      console.log(error);
    }
  }

  async function handleSave() {
    if (id) {
      await update();
    } else {
      await create();
    }
    resetForm();
    await list();
  }

  useEffect(() => {
    list();
  }, [search]);

  return {
    id,
    setId,
    title,
    setTitle,
    search,
    setSearch,
    content,
    setContent,
    posts,
    isBottomSheetOpen,
    handleOpenPress,
    handleClosePress,
    bottomSheetRef,
    snapPoints,
    create,
    update,
    list,
    details,
    remove,
    handleSave,
    closePreviousSwipeable,
  };
}
