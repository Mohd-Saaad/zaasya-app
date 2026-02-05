import React from 'react';
import { StyleSheet, View, Text, SafeAreaView, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import { Bell, Settings } from 'lucide-react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const AdminLayout = ({ children, title, subtitle = "Administrator", headerRight, showHeader = true }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {showHeader && (
                <View style={styles.header}>
                    <View style={styles.headerTop}>
                        <View style={styles.profileSection}>
                            <View style={styles.avatar} />
                            <Text style={styles.headerSubtitle}>{subtitle}</Text>
                        </View>
                        <View style={styles.headerIcons}>
                            <Bell color="white" size={20} />
                            <Settings color="white" size={20} style={{ marginLeft: 16 }} />
                        </View>
                    </View>
                    <View style={styles.headerTitleRow}>
                        <Text style={styles.headerTitle}>{title}</Text>
                        {headerRight}
                    </View>
                </View>
            )}

            <View style={[styles.content, !showHeader && { marginTop: 0, borderTopLeftRadius: 0, borderTopRightRadius: 0 }]}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1F55A6', // Using the exact color from XML: #1F55A6
    },
    header: {
        padding: 24,
        backgroundColor: '#1F55A6',
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
        marginTop: 10,
    },
    profileSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        marginRight: 12,
    },
    headerSubtitle: {
        color: 'white',
        fontWeight: '700',
        fontSize: 18,
    },
    headerIcons: {
        flexDirection: 'row',
    },
    headerTitleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 24,
        fontWeight: '700',
    },
    content: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        padding: 20,
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        marginTop: -10, // Slight overlap for smoother transition
    },
});

export default AdminLayout;
