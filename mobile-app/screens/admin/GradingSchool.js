import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';
import { Plus, Edit3, Trash2, Award } from 'lucide-react-native';
import AdminLayout from '../../components/AdminLayout';

const GradingSchool = ({ navigation, route }) => {
    const { school } = route.params || {};

    const [gradings, setGradings] = useState([
        { id: 1, subject: 'Mathematics', grade: 'A', year: '2023', comments: 'Excellent performance' },
        { id: 2, subject: 'English', grade: 'B+', year: '2023', comments: 'Improving' },
        { id: 3, subject: 'Science', grade: 'A-', year: '2023', comments: 'Very consistent' },
    ]);

    const GradingCard = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.cardHeader}>
                <View style={styles.subjectIcon}>
                    <Award size={20} color="#1F55A6" />
                </View>
                <View style={styles.headerInfo}>
                    <Text style={styles.subjectText}>{item.subject}</Text>
                    <Text style={styles.yearText}>Academic Year {item.year}</Text>
                </View>
                <Text style={styles.gradeText}>{item.grade}</Text>
            </View>
            <Text style={styles.commentsText}>{item.comments}</Text>
            <View style={styles.actions}>
                <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => navigation.navigate('EditGrading', { grading: item })}
                >
                    <Edit3 size={16} color="#64748b" />
                    <Text style={styles.actionText}>Edit</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.actionBtn, { marginLeft: 16 }]}>
                    <Trash2 size={16} color="#ef4444" />
                    <Text style={[styles.actionText, { color: '#ef4444' }]}>Remove</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const HeaderRight = () => (
        <TouchableOpacity style={styles.addHeaderBtn} onPress={() => navigation.navigate('AddGrading', { schoolId: school?.id })}>
            <Plus size={20} color="#1F55A6" />
        </TouchableOpacity>
    );

    return (
        <AdminLayout title={`${school?.name || 'School'} Grading`} headerRight={<HeaderRight />}>
            <FlatList
                data={gradings}
                keyExtractor={item => item.id.toString()}
                renderItem={GradingCard}
                ListEmptyComponent={
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No grading records found.</Text>
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </AdminLayout>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    subjectIcon: {
        width: 36,
        height: 36,
        borderRadius: 10,
        backgroundColor: '#eff6ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    headerInfo: {
        flex: 1,
    },
    subjectText: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1e293b',
    },
    yearText: {
        fontSize: 12,
        color: '#94a3b8',
        marginTop: 2,
    },
    gradeText: {
        fontSize: 20,
        fontWeight: '800',
        color: '#1F55A6',
    },
    commentsText: {
        fontSize: 14,
        color: '#475569',
        lineHeight: 20,
        marginBottom: 16,
        paddingLeft: 4,
    },
    actions: {
        flexDirection: 'row',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        paddingTop: 12,
    },
    actionBtn: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionText: {
        fontSize: 13,
        fontWeight: '600',
        color: '#64748b',
        marginLeft: 6,
    },
    addHeaderBtn: {
        backgroundColor: 'white',
        width: 36,
        height: 36,
        borderRadius: 18,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        padding: 40,
        alignItems: 'center',
    },
    emptyText: {
        color: '#94a3b8',
        fontSize: 15,
    },
});

export default GradingSchool;
