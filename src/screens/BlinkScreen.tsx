import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import type React from "react";
import BlinkBox from "../components/blinks";

export default function BlinkScreen() {
  const actionsRegistry = [
    "https://dial.to/helius/stake",
    "https://degenmarkets.com/pools/9rJ8Wr3thMyX2g52iYwo3d8Rx54BqFYnjNrb84Cv6arb",
    "https://matchups.fun/fight",
    "https://memeroyale.xyz/tokens/HokhDNyQdXG3agBVXCKeQmPJ3e7D5jrWP2xUjxDB4nw3",
    "https://checkmate.sendarcade.fun"
  ];

  return (
    <ScrollView>
      <View style={styles.screenContainer}>
        {actionsRegistry.length === 0 && <Text>No actions found</Text>}
        {actionsRegistry?.map((action, index) =>
          action ? <BlinkBox key={index} url={action} /> : null
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%",
    padding: 16,
  },
});
