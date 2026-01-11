import React from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from "react-native-reanimated";
import Arch from "./Arch";
import { colors } from "../constants/colors";

interface SmileyFaceProps {
  translateX: SharedValue<number>;
  snapPositions: {
    first: number;
    second: number;
    third: number;
  };
  showMouth: boolean;   // <-- added
}

const AnimatedView = Animated.createAnimatedComponent(View);

export const SmileyFace: React.FC<SmileyFaceProps> = ({
  translateX,
  snapPositions,
  showMouth,
}) => {
  const leftEye = useAnimatedStyle(() => {
    const eyeX = interpolate(
      translateX.value,
      [snapPositions.first, snapPositions.second, snapPositions.third],
      [-10, 0, 10],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateX: eyeX }],
    };
  });

  const rightEye = useAnimatedStyle(() => {
    const eyeX = interpolate(
      translateX.value,
      [snapPositions.first, snapPositions.second, snapPositions.third],
      [10, 0, -10],
      Extrapolation.CLAMP
    );

    return {
      transform: [{ translateX: eyeX }],
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.eyesContainer}>
        <AnimatedView style={[styles.eye, leftEye]} />
        <AnimatedView style={[styles.eye, rightEye]} />
      </View>

      {/* Only show mouth when allowed */}
      {showMouth && (
        <Arch
          translateX={translateX}
          snapPositions={snapPositions}
          stroke={colors.black}
          size={100}
          strokeWidth={4}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: 275,
  },
  eyesContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  eye: {
    backgroundColor: colors.black,
    width: 50,
    height: 50,
    borderRadius: 25,
    marginHorizontal: 10,
  },
});
