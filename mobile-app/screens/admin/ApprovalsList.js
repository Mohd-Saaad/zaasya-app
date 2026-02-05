import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    Alert,
} from 'react-native';
import { Search, SlidersHorizontal, CheckCircle, XCircle } from 'lucide-react-native';
import AdminLayout from '../../components/AdminLayout';

const ApprovalsList = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [approvals, setApprovals] = useState([
        { id: 1, type: 'Student Registration', name: 'John Doe', date: '2024-02-01', status: 'Pending' },
        { id: 2, type: 'Sponsorship Request', name: 'Alice Smith', date: '2024-02-02', status: 'Pending' },
        { id: 3, type: 'Mark Correction', name: 'Lincoln High', date: '2024-01-30', status: 'Pending' },
    ]);

    const handleAction = (id, action) => {
        Alert.alert(
            `${action} Request`,
            `Are you sure you want to ${action.toLowerCase()} this request?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Confirm',
                    onPress: () => {
                        setApprovals(approvals.filter(a => a.id !== id));
                    }
                }
            ]
        );
    };

    const ApprovalCard = ({ item }) => (
        <View style={styles.card}>
            <View style={{ flex: 1.5 }}>
                <Text style={styles.cardTitle}>{item.type}</Text>
                <Text style={styles.subText}>{item.name}</Text>
                <Text style={styles.dateText}>{item.date}</Text>
            </View>
            <View style={styles.actionButtons}>
                <TouchableOpacity
                    style={[styles.actionBtn, styles.approveBtn]}
                    onPress={() => handleAction(item.id, 'Approve')}
                >
                    <CheckCircle size={20} color="#10b981" />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.actionBtn, styles.rejectBtn]}
                    onPress={() => handleAction(item.id, 'Reject')}
                >
                    <XCircle size={20} color="#ef4444" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <AdminLayout title="Pending Approvals">
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search size={20} color="#64748b" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search approvals..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.filterBtn}>
                    <SlidersHorizontal size={20} color="#1F55A6" />
                </TouchableOpacity>
            </View>

            <FlatList
                data={approvals.filter(a => a.name.toLowerCase().includes(searchQuery.toLowerCase()) || a.type.toLowerCase().includes(searchQuery.toLowerCase()))}
                keyExtractor={item => item.id.toString()}
                renderItem={ApprovalCard}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListEmptyComponent={
                    <View style={styles.emptyState}>
                        <Text style={styles.emptyText}>No pending approvals found.</Text>
                    </View>
                }
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
    filterBtn: {
        width: 52,
        height: 52,
        backgroundColor: '#eff6ff',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
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
    cardTitle: {
        fontSize: 15,
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
        fontWeight: '600',
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    actionBtn: {
        width: 44,
        height: 44,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    approveBtn: {
        backgroundColor: '#ecfdf5',
    },
    rejectBtn: {
        backgroundColor: '#fef2f2',
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

export default ApprovalsList;
