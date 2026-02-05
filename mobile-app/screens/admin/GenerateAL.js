import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Alert,
} from 'react-native';
import { FilePlus, User, GraduationCap, Calendar } from 'lucide-react-native';
import AdminLayout from '../../components/AdminLayout';

const GenerateAL = ({ navigation }) => {
    const [formData, setFormData] = useState({
        studentName: '',
        studentId: '',
        academicYear: '2024-2025',
        intake: 'Spring',
    });

    const handleGenerate = () => {
        if (!formData.studentName || !formData.studentId) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }

        Alert.alert(
            'Success',
            'Admission Letter generated successfully.',
            [
                { text: 'View Document', onPress: () => navigation.navigate('ViewGenerated') },
                { text: 'OK', style: 'default' }
            ]
        );
    };

    const InputField = ({ label, icon: Icon, value, onChangeText, placeholder }) => (
        <View style={styles.inputGroup}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.inputContainer}>
                <Icon size={20} color="#64748b" style={styles.inputIcon} />
                <TextInput
                    style={styles.input}
                    value={value}
                    onChangeText={onChangeText}
                    placeholder={placeholder}
                    placeholderTextColor="#94a3b8"
                />
            </View>
        </View>
    );

    return (
        <AdminLayout title="Generate AL">
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.sectionTitle}>Document Details</Text>

                <InputField
                    label="Student Full Name"
                    icon={User}
                    value={formData.studentName}
                    onChangeText={(text) => setFormData({ ...formData, studentName: text })}
                    placeholder="Enter student name"
                />

                <InputField
                    label="Student ID"
                    icon={GraduationCap}
                    value={formData.studentId}
                    onChangeText={(text) => setFormData({ ...formData, studentId: text })}
                    placeholder="e.g. STU-12345"
                />

                <InputField
                    label="Academic Year"
                    icon={Calendar}
                    value={formData.academicYear}
                    onChangeText={(text) => setFormData({ ...formData, academicYear: text })}
                    placeholder="e.g. 2024-2025"
                />

                <InputField
                    label="Intake Period"
                    icon={Calendar}
                    value={formData.intake}
                    onChangeText={(text) => setFormData({ ...formData, intake: text })}
                    placeholder="e.g. Spring / Fall"
                />

                <TouchableOpacity style={styles.generateBtn} onPress={handleGenerate}>
                    <FilePlus size={20} color="white" />
                    <Text style={styles.generateBtnText}>Generate Admission Letter</Text>
                </TouchableOpacity>

                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        This will generate a PDF document based on the current template.
                        The generated document will be available in the Repository.
                    </Text>
                </View>
            </ScrollView>
        </AdminLayout>
    );
};

const styles = StyleSheet.create({
    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 20,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        fontWeight: '600',
        color: '#64748b',
        marginBottom: 8,
        marginLeft: 4,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 56,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    inputIcon: {
        marginRight: 12,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#1e293b',
    },
    generateBtn: {
        backgroundColor: '#1F55A6',
        height: 56,
        borderRadius: 16,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 24,
    },
    generateBtnText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 10,
    },
    infoBox: {
        padding: 16,
        backgroundColor: '#eff6ff',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#dbeafe',
    },
    infoText: {
        fontSize: 13,
        color: '#1e40af',
        lineHeight: 18,
    }
});

export default GenerateAL;
