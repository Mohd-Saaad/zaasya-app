import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    StatusBar,
    Dimensions,
    ScrollView,
} from 'react-native';
import { Mail, Lock, User, Eye, EyeOff, ChevronLeft } from 'lucide-react-native';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const Auth = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    // Form State
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const API_BASE_URL = 'http://192.168.240.1:8000'; // Specific IP for Waydroid to talk to Host
    // const API_BASE_URL = 'http://192.168.29.103:8000'; // Use this for Physical Phone on Wi-Fi

    const fetchWithTimeout = async (url, options = {}, timeout = 5000) => {
        const controller = new AbortController();
        const id = setTimeout(() => controller.abort(), timeout);
        try {
            const response = await fetch(url, {
                ...options,
                signal: controller.signal
            });
            clearTimeout(id);
            return response;
        } catch (error) {
            clearTimeout(id);
            throw error;
        }
    };

    const handleAuth = async () => {
        if (!email || !password || (!isLogin && !name)) {
            alert('Please fill in all fields');
            return;
        }

        console.log(`Attempting ${isLogin ? 'Login' : 'Signup'} at: ${API_BASE_URL}`);

        setLoading(true);
        try {
            if (isLogin) {
                // Login expects OAuth2 Form Data
                const formData = new URLSearchParams();
                formData.append('username', email); // backend uses email as username
                formData.append('password', password);

                const response = await fetchWithTimeout(`${API_BASE_URL}/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData.toString(),
                });

                const data = await response.json();

                if (response.ok) {
                    onLogin(data);
                } else {
                    alert(data.detail || 'Login failed');
                }
            } else {
                // Signup expects Query Parameters
                const url = `${API_BASE_URL}/signup?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`;

                const response = await fetchWithTimeout(url, {
                    method: 'POST',
                });

                const data = await response.json();

                if (response.ok) {
                    alert('Signup successful! Auto-verified. You can now Sign In.');
                    setIsLogin(true);
                } else {
                    alert(data.detail || 'Signup failed');
                }
            }
        } catch (error) {
            console.error('Auth Error:', error);
            if (error.name === 'AbortError') {
                alert(`Connection Timeout! The app could not reach ${API_BASE_URL}. Is the backend running?`);
            } else {
                alert(`Connection Error: ${error.message}. Please check if the backend is running at ${API_BASE_URL}`);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" />

            {/* Header Section (Matching Main App) */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <TouchableOpacity style={styles.backBtn}>
                        <ChevronLeft color="white" size={24} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.headerTitle}>{isLogin ? 'Welcome Back!' : 'Create Account'}</Text>
                <Text style={styles.headerSubtitle}>
                    {isLogin ? 'Sign in to continue your Viking journey' : 'Join us and start your adventure'}
                </Text>
            </View>

            {/* Auth Content Area (Matching Content Styling) */}
            <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.authCard}>

                        {!isLogin && (
                            <View style={styles.inputGroup}>
                                <Text style={styles.inputLabel}>Full Name</Text>
                                <View style={styles.inputWrapper}>
                                    <User size={18} color="#64748b" />
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter your full name"
                                        placeholderTextColor="#94a3b8"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                </View>
                            </View>
                        )}

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Email Address</Text>
                            <View style={styles.inputWrapper}>
                                <Mail size={18} color="#64748b" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="name@example.com"
                                    placeholderTextColor="#94a3b8"
                                    keyboardType="email-address"
                                    autoCapitalize="none"
                                    value={email}
                                    onChangeText={setEmail}
                                />
                            </View>
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <View style={styles.inputWrapper}>
                                <Lock size={18} color="#64748b" />
                                <TextInput
                                    style={styles.input}
                                    placeholder="••••••••"
                                    placeholderTextColor="#94a3b8"
                                    secureTextEntry={!showPassword}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                                    {showPassword ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
                                </TouchableOpacity>
                            </View>
                        </View>

                        {isLogin && (
                            <TouchableOpacity style={styles.forgotBtn}>
                                <Text style={styles.forgotText}>Forgot Password?</Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={[styles.primaryBtn, loading && styles.disabledBtn]}
                            onPress={handleAuth}
                            disabled={loading}
                        >
                            <Text style={styles.primaryBtnText}>
                                {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
                            </Text>
                        </TouchableOpacity>

                        <View style={styles.dividerRow}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>OR</Text>
                            <View style={styles.divider} />
                        </View>

                        <View style={styles.toggleRow}>
                            <Text style={styles.toggleText}>
                                {isLogin ? "Don't have an account? " : "Already have an account? "}
                            </Text>
                            <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
                                <Text style={styles.toggleActionText}>
                                    {isLogin ? "Sign Up" : "Sign In"}
                                </Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2563eb', // Using the primary blue from App.js
    },
    header: {
        padding: 32,
        backgroundColor: '#2563eb',
        minHeight: 180,
    },
    headerTop: {
        marginBottom: 24,
    },
    backBtn: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 28,
        fontWeight: '700',
        marginBottom: 8,
    },
    headerSubtitle: {
        color: 'rgba(255,255,255,0.8)',
        fontSize: 14,
        fontWeight: '500',
    },
    content: {
        flex: 1,
        backgroundColor: '#f8fafc',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 24,
    },
    authCard: {
        marginTop: 8,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#2563eb',
        marginBottom: 8,
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 12,
        paddingHorizontal: 16,
        height: 56,
    },
    input: {
        flex: 1,
        marginLeft: 12,
        fontSize: 16,
        color: '#1e293b',
    },
    forgotBtn: {
        alignSelf: 'flex-end',
        marginBottom: 24,
    },
    forgotText: {
        color: '#2563eb',
        fontSize: 14,
        fontWeight: '600',
    },
    primaryBtn: {
        backgroundColor: '#2563eb',
        height: 56,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#2563eb',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 4,
    },
    primaryBtnText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    disabledBtn: {
        opacity: 0.7,
        backgroundColor: '#94a3b8',
    },
    dividerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 32,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#e2e8f0',
    },
    dividerText: {
        marginHorizontal: 16,
        color: '#94a3b8',
        fontSize: 12,
        fontWeight: '600',
    },
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 32,
    },
    toggleText: {
        color: '#64748b',
        fontSize: 14,
    },
    toggleActionText: {
        color: '#2563eb',
        fontWeight: '700',
        fontSize: 14,
    },
});

export default Auth;
