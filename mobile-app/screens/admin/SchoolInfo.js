import React from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Phone, Mail, MapPin, User, Edit3, Trash2 } from 'lucide-react-native';
import AdminLayout from '../../components/AdminLayout';

const SchoolInfo = ({ navigation, route }) => {
    const { schoolId } = route.params || {};

    // Mock data for a single school
    const school = {
        id: schoolId || 1,
        name: 'Lincoln High School',
        address: '123 Academic Way',
        city: 'New York, NY',
        phone: '+1 555-0123',
        email: 'info@lincolnhigh.edu',
        contactPerson: 'Dr. Sarah Wilson',
        description: 'A leading educational institution focused on excellence in science and technology.',
        studentsCount: 450,
        teachersCount: 35,
        established: '1995'
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
        <TouchableOpacity style={styles.editHeaderBtn} onPress={() => navigation.navigate('EditSchool', { school })}>
            <Edit3 size={18} color="#1F55A6" />
        </TouchableOpacity>
    );

    return (
        <AdminLayout title="School Profile" headerRight={<HeaderRight />}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>General Information</Text>
                    <InfoRow icon={MapPin} label="Location" value={`${school.address}, ${school.city}`} />
                    <InfoRow icon={Phone} label="Contact Number" value={school.phone} />
                    <InfoRow icon={Mail} label="Email Address" value={school.email} />
                    <InfoRow icon={User} label="Principal / Contact" value={school.contactPerson} />
                </View>

                <View style={styles.card}>
                    <Text style={styles.sectionTitle}>Statistics</Text>
                    <View style={styles.statsGrid}>
                        <View style={styles.statItem}>
                            <Text style={styles.statNum}>{school.studentsCount}</Text>
                            <Text style={styles.statName}>Students</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNum}>{school.teachersCount}</Text>
                            <Text style={styles.statName}>Teachers</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statNum}>{school.established}</Text>
                            <Text style={styles.statName}>Founded</Text>
                        </View>
                    </View>
                </View>

                <View style={styles.card}>
                    <Text style={sectionTitle}>About School</Text>
                    <Text style={styles.description}>{school.description}</Text>
                </View>

                <TouchableOpacity style={styles.deleteBtn}>
                    <Trash2 size={20} color="#ef4444" />
                    <Text style={styles.deleteBtnText}>Delete School Registry</Text>
                </TouchableOpacity>
            </ScrollView>
        </AdminLayout>
    );
};

const sectionTitle = {
    fontSize: 14,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 16,
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    sectionTitle: sectionTitle,
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
    statsGrid: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    statItem: {
        alignItems: 'center',
        flex: 1,
    },
    statNum: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1F55A6',
    },
    statName: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 4,
    },
    description: {
        fontSize: 14,
        lineHeight: 22,
        color: '#475569',
    },
    editHeaderBtn: {
        backgroundColor: 'white',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteBtn: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        marginTop: 10,
        marginBottom: 40,
    },
    deleteBtnText: {
        color: '#ef4444',
        fontWeight: '600',
        marginLeft: 8,
        fontSize: 15,
    },
});

export default SchoolInfo;
