import { ScrollView, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Blink, useAction } from "@dialectlabs/blinks-react-native";
import type React from "react";
import { getActionWalletAdapter } from "../../utils/getActionWalletAdapter";

export default function BlinkBox({ url }: { url: string }) {
  const adapter = getActionWalletAdapter();

  const { action } = useAction({ url, adapter });

  if (!action) {
    return (
      <View style={styles.screenContainer}>
        <Text>Could not find action for {url}</Text>
      </View>
    );
  }

  try {
    const actionURL = new URL(url);

    return (
      <ScrollView>
        <View style={styles.screenContainer}>
          <Blink
            theme={{
              "--blink-button": "#1D9BF0",
              "--blink-border-radius-rounded-button": 9999,
              // and any other custom styles
            }}
            action={action as any}
            websiteUrl={actionURL.href}
            websiteText={actionURL.hostname}
            securityLevel="all"
          />
        </View>
      </ScrollView>
    );
  } catch (error) {
    // If there's an error with the URL, return null
    return null;
  }
}

const styles = StyleSheet.create({
  screenContainer: {
    height: "100%",
    padding: 16,
  },
});
