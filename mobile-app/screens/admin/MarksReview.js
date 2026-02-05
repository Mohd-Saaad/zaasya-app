import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
} from 'react-native';
import { ClipboardCheck, ArrowRight, User, School } from 'lucide-react-native';
import AdminLayout from '../../components/AdminLayout';

const MarksReview = ({ navigation }) => {
    const [reviews, setReviews] = useState([
        { id: 1, school: 'Lincoln High', grade: '10th Grade', studentCount: 45, date: '2024-02-02' },
        { id: 2, school: 'Washington Prep', grade: '9th Grade', studentCount: 32, date: '2024-02-01' },
    ]);

    const handleReviewDetail = (item) => {
        Alert.alert('Review Details', `Opening full mark list for ${item.school} - ${item.grade}`);
    };

    const ReviewCard = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => handleReviewDetail(item)}>
            <View style={styles.statusIndicator} />
            <View style={styles.cardContent}>
                <View style={styles.row}>
                    <School size={16} color="#64748b" />
                    <Text style={styles.schoolName}>{item.school}</Text>
                </View>
                <View style={styles.row}>
                    <ClipboardCheck size={16} color="#64748b" />
                    <Text style={styles.gradeText}>{item.grade}</Text>
                </View>
                <View style={styles.footer}>
                    <View style={styles.stats}>
                        <User size={14} color="#94a3b8" />
                        <Text style={styles.statsText}>{item.studentCount} Students</Text>
                    </View>
                    <Text style={styles.dateText}>{item.date}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.arrowContainer}>
                <ArrowRight size={20} color="#1F55A6" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <AdminLayout title="Marks Review">
            <Text style={styles.sectionHeader}>Pending Submissions</Text>

            <FlatList
                data={reviews}
                keyExtractor={item => item.id.toString()}
                renderItem={ReviewCard}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>All submissions reviewed!</Text>
                    </View>
                }
            />
        </AdminLayout>
    );
};

const styles = StyleSheet.create({
    sectionHeader: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 20,
        marginBottom: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        elevation: 3,
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        overflow: 'hidden',
    },
    statusIndicator: {
        width: 4,
        height: '100%',
        backgroundColor: '#1F55A6',
        borderRadius: 2,
        position: 'absolute',
        left: 0,
        top: 16,
    },
    cardContent: {
        flex: 1,
        paddingLeft: 4,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    schoolName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1e293b',
        marginLeft: 8,
    },
    gradeText: {
        fontSize: 14,
        color: '#475569',
        marginLeft: 8,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 12,
        paddingTop: 12,
        borderTopWidth: 1,
        borderTopColor: '#f8fafc',
    },
    stats: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statsText: {
        fontSize: 12,
        color: '#94a3b8',
        fontWeight: '600',
        marginLeft: 4,
    },
    dateText: {
        fontSize: 11,
        color: '#94a3b8',
    },
    arrowContainer: {
        justifyContent: 'center',
        paddingLeft: 12,
    },
    emptyState: {
        alignItems: 'center',
        marginTop: 40,
    },
    emptyText: {
        color: '#64748b',
        fontSize: 16,
    }
});

export default MarksReview;
