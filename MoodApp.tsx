import React from "react";
import { View, Pressable, StyleSheet, Text, Animated as RNAnimated } from "react-native";
import Animated, { useSharedValue, withTiming, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { SmileyFace } from "./SmileyFace";
import { colors } from "./colors";

const moods = [
  { 
    name: "Sad", 
    color: "#FF8A80", 
    joke: "Sorry about that! Let’s fix it with a laugh.\nWhy do programmers mix up Halloween and Christmas?\nBecause Oct 31 == Dec 25!" 
  },
  { 
    name: "Neutral", 
    color: "#FFD180", 
    joke: "A simple one for you:\nWhy do Java developers wear glasses?\nBecause they don’t C#." 
  },
  { 
    name: "Happy", 
    color: "#80D8FF", 
    joke: "A little joy to add to your day:\nHow many programmers does it take to change a light bulb?\nNone, that's a hardware problem!" 
  },
];

// default mood before selection
const defaultMood = { name: "", color: "#D2B48C", joke: "" }; // light brown

export default function MoodApp() {
  const translateX = useSharedValue(0); // Smiley face value
  const [currentMood, setCurrentMood] = React.useState<number | null>(null);

  // Fade-in joke using RN Animated
  const fadeAnim = React.useRef(new RNAnimated.Value(0)).current;

  // Dot scale shared values
  const dotScales = moods.map(() => useSharedValue(1));

  const handleMoodPress = (index: number) => {
    setCurrentMood(index);
    translateX.value = withTiming(index, { duration: 500 });

    // Animate selected dot
    dotScales[index].value = withSpring(1.4, {}, () => {
      dotScales[index].value = withSpring(1);
    });

    // Fade-in joke
    RNAnimated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const moodToShow = currentMood !== null ? moods[currentMood] : defaultMood;

  return (
    <View style={[styles.container, { backgroundColor: moodToShow.color }]}>
      <Text style={styles.title}>How are you feeling today?</Text>

      {/* Smiley Face */}
      <SmileyFace
        translateX={translateX}
        snapPositions={{ first: 0, second: 1, third: 2 }}
        showMouth={currentMood !== null}
      />

      {/* Intro text */}
      {currentMood === null && (
        <Text style={styles.introText}>
          Tap a mood to reveal a mood booster 😉
        </Text>
      )}

      {/* Mood Dots */}
      <View style={styles.dotsContainer}>
        {moods.map((mood, i) => {
          const animatedStyle = useAnimatedStyle(() => ({
            transform: [{ scale: dotScales[i].value }],
          }));
          return (
            <View key={i} style={{ alignItems: "center" }}>
              <Pressable onPress={() => handleMoodPress(i)}>
                <Animated.View
                  style={[
                    styles.dot,
                    { backgroundColor: currentMood === i ? colors.white : colors.gray },
                    animatedStyle,
                  ]}
                />
              </Pressable>
              <Text style={styles.dotLabel}>{mood.name}</Text>
            </View>
          );
        })}
      </View>

      {/* Fade-in Joke */}
      {currentMood !== null && (
        <RNAnimated.View style={[styles.jokeBox, { opacity: fadeAnim }]}>
          <Text style={styles.jokeText}>{moodToShow.joke}</Text>
        </RNAnimated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
  title: { fontSize: 32, fontWeight: "bold", marginBottom: 20, color: colors.black, textAlign: "center" },
  introText: { marginTop: 20, fontSize: 18, fontWeight: "600", color: colors.black, textAlign: "center", paddingHorizontal: 30 },
  dotsContainer: { flexDirection: "row", marginTop: 40, width: 280, justifyContent: "space-between" },
  dot: { width: 50, height: 50, borderRadius: 25 },
  dotLabel: { marginTop: 8, fontWeight: "bold", color: colors.black, fontSize: 16 },
  jokeBox: { marginTop: 30, backgroundColor: "#fff8e1", borderRadius: 12, padding: 20, width: "60%", shadowColor: "#000", shadowOpacity: 0.2, shadowOffset: { width: 0, height: 3 }, shadowRadius: 5, elevation: 5 },
  jokeText: { fontSize: 18, color: colors.textPrimary, textAlign: "center" },
});
