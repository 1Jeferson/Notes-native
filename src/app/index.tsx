import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { ConfirmDeleteModal } from "@/components/Modal";
import { Option } from "@/components/Option";
import { Post } from "@/components/Post";
import { usePost } from "@/hooks/usePost";
import { COLORS } from "@/styles/colors";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { router } from "expo-router";
import { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable, {
  SwipeableMethods,
} from "react-native-gesture-handler/ReanimatedSwipeable";

export default function Index() {
  const {
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
    details,
    remove,
    handleSave,
    closePreviousSwipeable,
  } = usePost();

  const [isModalVisible, setModalVisible] = useState(false);
  const [postToDelete, setPostToDelete] = useState<number | null>(null);

  const showDeleteModal = (postId: number) => {
    setPostToDelete(postId);
    setModalVisible(true);
  };

  const confirmDelete = () => {
    if (postToDelete) {
      remove(postToDelete);
    }
    setModalVisible(false);
    setPostToDelete(null);
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Input
          style={styles.searchInput}
          placeholder="Pesquisar"
          onChangeText={setSearch}
        />

        <FlatList
          data={posts}
          style={styles.cards}
          keyExtractor={(item) => String(item.id)}
          renderItem={({ item }) => {
            let current: SwipeableMethods | null = null;
            return (
              <Swipeable
                ref={(swipeable) => (current = swipeable)}
                containerStyle={styles.swipeable}
                overshootRight={false}
                onSwipeableWillOpen={(direction) =>
                  closePreviousSwipeable(direction, current)
                }
                renderRightActions={() => (
                  <View style={styles.rightActions}>
                    <Option
                      icon="edit-square"
                      backgroundColor={COLORS.button.green}
                      onPress={() => details(item)}
                      onPressIn={handleOpenPress}
                    />
                    <Option
                      icon="delete"
                      backgroundColor={COLORS.button.red}
                      onPress={() => showDeleteModal(item.id)}
                    />
                  </View>
                )}
              >
                <Post
                  data={item}
                  onPress={() => router.navigate(`/details/${item.id}`)}
                />
              </Swipeable>
            );
          }}
          contentContainerStyle={{ gap: 16 }}
        />

        <BottomSheet
          ref={bottomSheetRef}
          index={-1}
          snapPoints={snapPoints}
          backgroundStyle={{ backgroundColor: "#090014" }}
          handleIndicatorStyle={{
            backgroundColor: COLORS.textColor,
            width: 90,
            height: 10,
            marginTop: 16,
          }}
        >
          <View style={styles.bottomSheetContainer}>
            <BottomSheetView style={styles.content}>
              <Input
                placeholder="Título"
                placeholderTextColor={COLORS.textColor}
                value={title}
                onChangeText={setTitle}
              />
              <Input
                placeholder="Conteúdo"
                placeholderTextColor={COLORS.textColor}
                isTextArea
                value={content}
                onChangeText={setContent}
              />
            </BottomSheetView>

            <View style={styles.footerSheet}>
              <Button
                width={60}
                height={60}
                onPress={handleSave}
                icon="check"
                backgroundColor={COLORS.button.blue}
              />
              <Button
                width={60}
                height={60}
                onPress={handleClosePress}
                icon="keyboard-return"
                backgroundColor={COLORS.button.red}
              />
            </View>
          </View>
        </BottomSheet>

        <View
          style={[
            styles.addButtonContainer,
            isBottomSheetOpen && { zIndex: -1 },
          ]}
        >
          <Button
            width={60}
            height={60}
            onPress={handleOpenPress}
            icon="add"
            backgroundColor={COLORS.button.blue}
          />
        </View>

        <ConfirmDeleteModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onConfirm={confirmDelete}
        />
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    gap: 16,
    paddingTop: 90,
    backgroundColor: COLORS.background,
  },
  rightActions: {
    flexDirection: "row",
  },
  cards: {
    marginTop: 40,
  },
  swipeable: {
    backgroundColor: COLORS.backgroundSecondary,
    borderRadius: 16,
  },
  searchInput: {
    height: 54,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    borderRadius: 24,
    paddingHorizontal: 16,
  },
  bottomSheetContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: 16,
  },
  content: {
    flex: 1,
  },
  footerSheet: {
    flexDirection: "column",
    alignItems: "flex-end",
    marginBottom: 16,
    gap: 20,
  },
  addButtonContainer: {
    alignItems: "flex-end",
    marginBottom: 16,
    zIndex: 1,
  },
  bottomSheet: {
    zIndex: 2,
  },
});
