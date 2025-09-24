import React from 'react';
import { Link, router } from 'expo-router';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function About() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>About Page</Text>
      <Text style={styles.subtitle}>This demonstrates Expo Router navigation!</Text>

      <View style={styles.buttonContainer}>
        <Link href="/" asChild>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Go Home (Link Component)</Text>
          </TouchableOpacity>
        </Link>

        <TouchableOpacity
          style={[styles.button, styles.buttonSecondary]}
          onPress={() => router.push('/')}
        >
          <Text style={styles.buttonText}>Go Home (Router Push)</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.buttonBack]} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333'
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 40,
    textAlign: 'center',
    color: '#666'
  },
  buttonContainer: {
    width: '100%',
    gap: 16
  },
  button: {
    backgroundColor: '#143055',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center'
  },
  buttonSecondary: {
    backgroundColor: '#2563eb'
  },
  buttonBack: {
    backgroundColor: '#059669'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  }
});
