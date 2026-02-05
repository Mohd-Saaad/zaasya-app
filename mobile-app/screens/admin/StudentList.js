import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    Switch,
} from 'react-native';
import { Search, SlidersHorizontal, Edit3, UserPlus } from 'lucide-react-native';
import AdminLayout from '../../components/AdminLayout';

const StudentList = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [students, setStudents] = useState([
        { id: 1, name: 'Emily Johnson', grade: '10th', status: 'Active', school: 'Lincoln High' },
        { id: 2, name: 'Michael Brown', grade: '9th', status: 'Active', school: 'Lincoln High' },
        { id: 3, name: 'Sarah Davis', grade: '11th', status: 'Inactive', school: 'Washington Prep' },
    ]);

    const toggleStatus = (id) => {
        setStudents(students.map(s => s.id === id ? { ...s, status: s.status === 'Active' ? 'Inactive' : 'Active' } : s));
    };

    const StudentCard = ({ item }) => (
        <TouchableOpacity
            style={styles.userCard}
            onPress={() => navigation.navigate('ViewStudent', { studentId: item.id })}
        >
            <View style={{ flex: 1.5 }}>
                <Text style={styles.userName}>{item.name}</Text>
                <Text style={styles.subText}>{item.school}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style={styles.roleBadge}>
                    <Text style={styles.roleText}>{item.grade}</Text>
                </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Switch
                    value={item.status === 'Active'}
                    onValueChange={() => toggleStatus(item.id)}
                    trackColor={{ false: '#cbd5e1', true: '#1F55A6' }}
                />
            </View>
            <TouchableOpacity
                style={styles.editBtn}
                onPress={() => navigation.navigate('EditStudent', { student: item })}
            >
                <Edit3 size={16} color="#1F55A6" />
            </TouchableOpacity>
        </TouchableOpacity>
    );

    const AddButton = () => (
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddStudent')}>
            <Text style={styles.addBtnText}>+ Add New Student</Text>
        </TouchableOpacity>
    );

    return (
        <AdminLayout title="Student List" headerRight={<AddButton />}>
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search size={20} color="#64748b" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search students..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.filterBtn}>
                    <SlidersHorizontal size={20} color="#1F55A6" />
                </TouchableOpacity>
            </View>

            <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Name/School</Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>Grade</Text>
                <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'center' }]}>Status</Text>
                <Text style={[styles.tableHeaderText, { width: 40 }]}>Action</Text>
            </View>

            <FlatList
                data={students.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                keyExtractor={item => item.id.toString()}
                renderItem={StudentCard}
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
    filterBtn: {
        width: 52,
        height: 52,
        backgroundColor: '#eff6ff',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    tableHeader: {
        flexDirection: 'row',
        paddingHorizontal: 12,
        marginBottom: 16,
    },
    tableHeaderText: {
        fontSize: 11,
        color: '#94a3b8',
        fontWeight: '700',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    userCard: {
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
    userName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 2,
    },
    subText: {
        fontSize: 12,
        color: '#64748b',
    },
    roleBadge: {
        backgroundColor: '#eff6ff',
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 10,
        alignSelf: 'flex-start',
    },
    roleText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#1F55A6',
    },
    editBtn: {
        width: 36,
        height: 36,
        borderRadius: 12,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    addBtn: {
        backgroundColor: '#FFFFFF22',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#FFFFFF44',
    },
    addBtnText: {
        color: 'white',
        fontSize: 13,
        fontWeight: '700',
    },
});

export default StudentList;
