/* eslint-disable jsx-a11y/accessible-emoji */
import React from 'react';
import { Link } from 'expo-router';
import { SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.title} testID="heading">
              Welcome to
            </Text>
            <Text style={styles.appTitle}>PMobile 🚀</Text>
            <Text style={styles.subtitle}>Built with Expo Router</Text>
          </View>

          <View style={styles.hero}>
            <View style={styles.statusContainer}>
              <View style={styles.statusIcon}>
                <Text style={styles.checkmark}>✅</Text>
              </View>
              <Text style={styles.statusText}>Expo Router is working!</Text>
            </View>

            <View style={styles.navigationSection}>
              <Text style={styles.sectionTitle}>Try Navigation</Text>

              <Link href="/about" asChild>
                <TouchableOpacity style={styles.primaryButton}>
                  <Text style={styles.primaryButtonText}>Go to About Page</Text>
                </TouchableOpacity>
              </Link>

              <TouchableOpacity style={styles.secondaryButton}>
                <Text style={styles.secondaryButtonText}>Stay Here</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>File-based routing • TypeScript • React Native</Text>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc'
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 24
  },
  header: {
    alignItems: 'center',
    marginTop: 60
  },
  title: {
    fontSize: 24,
    color: '#64748b',
    marginBottom: 8
  },
  appTitle: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8
  },
  subtitle: {
    fontSize: 18,
    color: '#64748b',
    fontWeight: '500'
  },
  hero: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dcfce7',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 40
  },
  statusIcon: {
    marginRight: 12
  },
  checkmark: {
    fontSize: 20
  },
  statusText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#166534'
  },
  navigationSection: {
    alignItems: 'center',
    width: '100%'
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 24
  },
  primaryButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: '100%',
    maxWidth: 280
  },
  primaryButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center'
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    width: '100%',
    maxWidth: 280
  },
  secondaryButtonText: {
    color: '#6b7280',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center'
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20
  },
  footerText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center'
  }
});
