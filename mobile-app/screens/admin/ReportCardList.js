import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native';
import { Search, FileText, ChevronRight } from 'lucide-react-native';
import AdminLayout from '../../components/AdminLayout';

const ReportCardList = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [reportCards, setReportCards] = useState([
        { id: 1, studentName: 'Emily Johnson', grade: 'Term 1', school: 'Lincoln High', date: '2024-01-15' },
        { id: 2, studentName: 'Michael Brown', grade: 'Term 1', school: 'Lincoln High', date: '2024-01-15' },
        { id: 3, studentName: 'Sarah Davis', grade: 'Annual', school: 'Washington Prep', date: '2023-12-20' },
    ]);

    const ReportCardItem = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('MarksReview', { reportId: item.id })}
        >
            <View style={styles.iconContainer}>
                <FileText size={24} color="#1F55A6" />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.studentName}>{item.studentName}</Text>
                <Text style={styles.subText}>{item.school} • {item.grade}</Text>
                <Text style={styles.dateText}>Generated: {item.date}</Text>
            </View>
            <ChevronRight size={20} color="#cbd5e1" />
        </TouchableOpacity>
    );

    return (
        <AdminLayout title="Report Cards">
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search size={20} color="#64748b" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search by student or school..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
            </View>

            <FlatList
                data={reportCards.filter(r => r.studentName.toLowerCase().includes(searchQuery.toLowerCase()) || r.school.toLowerCase().includes(searchQuery.toLowerCase()))}
                keyExtractor={item => item.id.toString()}
                renderItem={ReportCardItem}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </AdminLayout>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        borderRadius: 16,
        paddingHorizontal: 16,
        height: 52,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: '#1e293b',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 20,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        elevation: 3,
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 12,
        backgroundColor: '#eff6ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    cardContent: {
        flex: 1,
    },
    studentName: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 2,
    },
    subText: {
        fontSize: 13,
        color: '#64748b',
        marginBottom: 2,
    },
    dateText: {
        fontSize: 11,
        color: '#94a3b8',
        fontWeight: '500',
    },
});

export default ReportCardList;
