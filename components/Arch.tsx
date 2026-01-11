import React from "react";
import Svg, { Path } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  interpolate,
  Extrapolation,
} from "react-native-reanimated";
import type { SharedValue } from "react-native-reanimated";

const AnimatedPath = Animated.createAnimatedComponent(Path);

interface ArchProps {
  translateX: SharedValue<number>;
  snapPositions: {
    first: number;
    second: number;
    third: number;
  };
  stroke?: string;
  strokeWidth?: number;
  size?: number;
}

const Arch: React.FC<ArchProps> = ({
  translateX,
  snapPositions,
  stroke = "black",
  strokeWidth = 2,
  size = 32,
}) => {
  const animatedProps = useAnimatedProps(() => {
    const progress = interpolate(
      translateX.value,
      [snapPositions.first, snapPositions.second, snapPositions.third],
      [0, 0.5, 1],
      Extrapolation.CLAMP
    );

    const startX = 5;
    const endX = 27;
    const midX = (startX + endX) / 2;

    const baseY = 16;
    const controlY = interpolate(progress, [0, 0.5, 1], [6, baseY, 26], Extrapolation.CLAMP);

    return {
      d: `M${startX},${baseY} Q${midX},${controlY} ${endX},${baseY}`,
    };
  });

  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <AnimatedPath
        animatedProps={animatedProps}
        stroke={stroke}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default Arch;
