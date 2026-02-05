import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { User, Phone, MapPin, School, Calendar, Heart, Edit3 } from 'lucide-react-native';
import AdminLayout from '../../components/AdminLayout';

const ViewStudent = ({ navigation, route }) => {
    const { studentId } = route.params || {};

    // Mock data
    const student = {
        id: studentId || 1,
        name: 'Emily Johnson',
        dob: '12/05/2008',
        gender: 'Female',
        school: 'Lincoln High School',
        grade: '10th Grade',
        guardianName: 'Robert Johnson',
        guardianPhone: '+1 555-9876',
        address: '456 Oak Street, NY',
        isSponsored: true,
        sponsorName: 'Global Education Fund'
    };

    const InfoRow = ({ icon: Icon, label, value }) => (
        <View style={styles.infoRow}>
            <View style={styles.iconBox}>
                <Icon size={18} color="#1F55A6" />
            </View>
            <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>{label}</Text>
                <Text style={styles.infoValue}>{value}</Text>
            </View>
        </View>
    );

    const HeaderRight = () => (
        <TouchableOpacity style={styles.editHeaderBtn} onPress={() => navigation.navigate('EditStudent', { student })}>
            <Edit3 size={18} color="#1F55A6" />
        </TouchableOpacity>
    );

    return (
        <AdminLayout title="Student Profile" headerRight={<HeaderRight />}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.profileSection}>
                    <View style={styles.avatarLarge}>
                        <User size={40} color="#1F55A6" />
                    </View>
                    <Text style={styles.studentName}>{student.name}</Text>
                    <View style={styles.statusBadge}>
                        <Text style={styles.statusText}>{student.grade}</Text>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Personal Details</Text>
                    <InfoRow icon={Calendar} label="Date of Birth" value={student.dob} />
                    <InfoRow icon={User} label="Gender" value={student.gender} />
                    <InfoRow icon={MapPin} label="Address" value={student.address} />
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Education</Text>
                    <InfoRow icon={School} label="Current School" value={student.school} />
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Guardian Information</Text>
                    <InfoRow icon={User} label="Name" value={student.guardianName} />
                    <InfoRow icon={Phone} label="Contact" value={student.guardianPhone} />
                </View>

                {student.isSponsored && (
                    <View style={[styles.card, { borderColor: '#1F55A6', backgroundColor: '#f0f7ff' }]}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                            <Heart size={18} color="#1F55A6" fill="#1F55A6" />
                            <Text style={[styles.sectionTitle, { marginBottom: 0, marginLeft: 8, color: '#1F55A6' }]}>Sponsorship</Text>
                        </View>
                        <Text style={styles.infoValue}>{student.sponsorName}</Text>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.sponsorActionBtn}
                    onPress={() => navigation.navigate('SponsorStudent', { student })}
                >
                    <Heart size={20} color="white" />
                    <Text style={styles.sponsorActionText}>Manage Sponsorship</Text>
                </TouchableOpacity>
            </ScrollView>
        </AdminLayout>
    );
};

const styles = StyleSheet.create({
    profileSection: {
        alignItems: 'center',
        marginBottom: 24,
    },
    avatarLarge: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#eff6ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    studentName: {
        fontSize: 22,
        fontWeight: '700',
        color: '#1e293b',
    },
    statusBadge: {
        backgroundColor: '#1F55A6',
        paddingVertical: 4,
        paddingHorizontal: 12,
        borderRadius: 20,
        marginTop: 8,
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
    },
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    iconBox: {
        width: 36,
        height: 36,
        borderRadius: 8,
        backgroundColor: '#eff6ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    infoContent: {
        flex: 1,
    },
    infoLabel: {
        fontSize: 11,
        color: '#94a3b8',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1e293b',
    },
    editHeaderBtn: {
        backgroundColor: 'white',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sponsorActionBtn: {
        backgroundColor: '#1F55A6',
        flexDirection: 'row',
        height: 56,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 40,
    },
    sponsorActionText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
        marginLeft: 10,
    }
});

export default ViewStudent;
