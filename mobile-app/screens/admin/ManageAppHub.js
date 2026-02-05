import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Users, School, ChevronRight, CheckSquare, FileText, FilePlus, Archive, ClipboardCheck } from 'lucide-react-native';
import AdminLayout from '../../components/AdminLayout';

const ManageAppHub = ({ navigation }) => {
    const HubItem = ({ icon: Icon, title, description, onPress }) => (
        <TouchableOpacity style={styles.hubCard} onPress={onPress}>
            <View style={styles.iconContainer}>
                <Icon size={32} color="#1F55A6" />
            </View>
            <View style={styles.hubContent}>
                <Text style={styles.hubTitle}>{title}</Text>
                <Text style={styles.hubDescription}>{description}</Text>
            </View>
            <ChevronRight size={20} color="#cbd5e1" />
        </TouchableOpacity>
    );

    return (
        <AdminLayout title="Manage Application">
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.sectionHeader}>Administrative Modules</Text>

                <HubItem
                    icon={Users}
                    title="Student Management"
                    description="Manage student enrollments, profiles, and sponsorship aid."
                    onPress={() => navigation.navigate('StudentStack')}
                />

                <HubItem
                    icon={School}
                    title="School Management"
                    description="Register schools, update details, and manage academic grading."
                    onPress={() => navigation.navigate('SchoolStack')}
                />

                <Text style={styles.sectionHeader}>Academic & Operations</Text>

                <HubItem
                    icon={CheckSquare}
                    title="Pending Approvals"
                    description="Review and approve student registrations and sponsorship aid requests."
                    onPress={() => navigation.navigate('ManageStack', { screen: 'ApprovalsList' })}
                />

                <HubItem
                    icon={FileText}
                    title="Report Card List"
                    description="View and manage generated student report cards across different terms."
                    onPress={() => navigation.navigate('ManageStack', { screen: 'ReportCardList' })}
                />

                <HubItem
                    icon={ClipboardCheck}
                    title="Marks Review List"
                    description="Review and approve pending mark submissions from various schools."
                    onPress={() => navigation.navigate('ManageStack', { screen: 'MarksReview' })}
                />

                <HubItem
                    icon={FilePlus}
                    title="Generate Admission Letter"
                    description="Create and preview official admission letters for students."
                    onPress={() => navigation.navigate('ManageStack', { screen: 'GenerateAL' })}
                />

                <HubItem
                    icon={Archive}
                    title="Document Repository"
                    description="Access previously generated admission letters and academic reports."
                    onPress={() => navigation.navigate('ManageStack', { screen: 'ViewGenerated' })}
                />

                <View style={styles.infoBox}>
                    <Text style={styles.infoText}>
                        Select a module to manage specific aspects of the Viking infrastructure.
                        Access is restricted based on your administrative role.
                    </Text>
                </View>
            </ScrollView>
        </AdminLayout>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingBottom: 40,
    },
    sectionHeader: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 20,
        marginTop: 10,
    },
    hubCard: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        elevation: 3,
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 18,
        backgroundColor: '#eff6ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 20,
    },
    hubContent: {
        flex: 1,
    },
    hubTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 4,
    },
    hubDescription: {
        fontSize: 13,
        color: '#64748b',
        lineHeight: 18,
    },
    infoBox: {
        marginTop: 20,
        padding: 20,
        backgroundColor: '#f8fafc', // Softer background
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    infoText: {
        fontSize: 13,
        color: '#64748b',
        lineHeight: 20,
        textAlign: 'center',
        fontWeight: '500',
    },
});

export default ManageAppHub;
