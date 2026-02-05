import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
    Modal,
    ScrollView,
    Switch,
} from 'react-native';
import {
    Search,
    SlidersHorizontal,
    Edit3,
    X,
    UploadCloud,
    ChevronDown,
} from 'lucide-react-native';
import AdminLayout from '../../components/AdminLayout';

const UserListDashboard = () => {
    const [users, setUsers] = useState([
        { id: 1, name: 'John Doe', role: 'Admin', status: 'Active', email: 'john.doe@example.com', mobile: '+1 555-555-5555' },
        { id: 2, name: 'Jane Smith', role: 'Teacher', status: 'Active', email: 'jane.smith@school.edu', mobile: '+1 555-123-4567' },
        { id: 3, name: 'Emily Johnson', role: 'Student', status: 'Active', email: 'emily.j@student.org', mobile: '+1 555-987-6543' },
        { id: 4, name: 'Michael Brown', role: 'Sponsor', status: 'Active', email: 'm.brown@sponsor.com', mobile: '+1 555-222-3333' },
        { id: 5, name: 'Sarah Davis', role: 'Teacher', status: 'Active', email: 's.davis@school.edu', mobile: '+1 555-444-5555' },
    ]);

    const [searchQuery, setSearchQuery] = useState('');
    const [isAddModalVisible, setAddModalVisible] = useState(false);
    const [isBulkVisible, setBulkVisible] = useState(false);
    const [editingUser, setEditingUser] = useState(null);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.role.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleStatus = (id) => {
        setUsers(users.map(u => u.id === id ? { ...u, status: u.status === 'Active' ? 'Inactive' : 'Active' } : u));
    };

    const UserCard = ({ item }) => (
        <View style={styles.userCard}>
            <View style={{ flex: 1.5 }}>
                <Text style={styles.userName}>{item.name}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <View style={styles.roleBadge}>
                    <Text style={styles.roleText}>{item.role}</Text>
                </View>
            </View>
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Switch
                    value={item.status === 'Active'}
                    onValueChange={() => toggleStatus(item.id)}
                    trackColor={{ false: '#cbd5e1', true: '#1F55A6' }}
                />
            </View>
            <TouchableOpacity style={styles.editBtn} onPress={() => { setEditingUser(item); setAddModalVisible(true); }}>
                <Edit3 size={16} color="#1F55A6" />
            </TouchableOpacity>
        </View>
    );

    const AddButton = () => (
        <TouchableOpacity style={styles.addBtn} onPress={() => { setEditingUser(null); setAddModalVisible(true); }}>
            <Text style={styles.addBtnText}>+ Add New User</Text>
        </TouchableOpacity>
    );

    return (
        <AdminLayout title="User List" headerRight={<AddButton />}>
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Search size={20} color="#64748b" />
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>
                <TouchableOpacity style={styles.filterBtn}>
                    <SlidersHorizontal size={20} color="#1F55A6" />
                </TouchableOpacity>
            </View>

            <View style={styles.tableHeader}>
                <Text style={[styles.tableHeaderText, { flex: 1.5 }]}>Name</Text>
                <Text style={[styles.tableHeaderText, { flex: 1 }]}>Role</Text>
                <Text style={[styles.tableHeaderText, { flex: 1, textAlign: 'center' }]}>Status</Text>
                <Text style={[styles.tableHeaderText, { width: 40 }]}>Action</Text>
            </View>

            <FlatList
                data={filteredUsers}
                keyExtractor={item => item.id.toString()}
                renderItem={UserCard}
                contentContainerStyle={{ paddingBottom: 100 }}
            />

            <View style={styles.bulkActions}>
                <TouchableOpacity style={styles.secondaryBtn} onPress={() => setBulkVisible(true)}>
                    <Text style={styles.secondaryBtnText}>Bulk Upload</Text>
                    <UploadCloud size={16} color="#1F55A6" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.primaryBtn}>
                    <Text style={styles.primaryBtnText}>Export CSV</Text>
                    <ChevronDown size={16} color="white" />
                </TouchableOpacity>
            </View>

            {/* Add/Edit Modal */}
            <Modal visible={isAddModalVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>{editingUser ? 'Edit User' : 'Add New User'}</Text>
                        <ScrollView>
                            <InputGroup label="Name" placeholder="John Doe" initialValue={editingUser?.name} />
                            <InputGroup label="Email address" placeholder="johndoe@gmail.com" initialValue={editingUser?.email} />
                            <InputGroup label="Mobile Number" placeholder="+1 555-555-5555" initialValue={editingUser?.mobile} />
                            <InputGroup label="Select Role" placeholder="Teacher" initialValue={editingUser?.role} />

                            <View style={styles.modalRow}>
                                <Text style={styles.modalLabel}>Status</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={{ marginRight: 8, color: '#64748b' }}>Active</Text>
                                    <Switch value={true} trackColor={{ false: '#cbd5e1', true: '#1F55A6' }} />
                                </View>
                            </View>

                            <View style={styles.modalActions}>
                                <TouchableOpacity style={[styles.primaryBtn, { flex: 1 }]} onPress={() => setAddModalVisible(false)}>
                                    <Text style={styles.primaryBtnText}>Save</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={[styles.secondaryBtn, { flex: 1, marginLeft: 12 }]} onPress={() => setAddModalVisible(false)}>
                                    <Text style={styles.secondaryBtnText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Modal>

            {/* Bulk Upload Modal */}
            <Modal visible={isBulkVisible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <View style={styles.bulkHeader}>
                            <Text style={styles.modalTitle}>Bulk Upload</Text>
                            <TouchableOpacity onPress={() => setBulkVisible(false)}>
                                <X color="#64748b" size={24} />
                            </TouchableOpacity>
                        </View>

                        <View style={styles.uploadArea}>
                            <UploadCloud size={48} color="#1F55A6" />
                            <Text style={styles.uploadTitle}>Upload .CSV file</Text>
                            <Text style={styles.uploadOr}>OR</Text>
                            <TouchableOpacity style={[styles.secondaryBtn, { width: 'auto', paddingHorizontal: 24 }]}>
                                <Text style={styles.secondaryBtnText}>Browse files</Text>
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.bulkNote}>
                            Download the sample .CSV template and follow the format to upload
                        </Text>

                        <TouchableOpacity style={[styles.primaryBtn, { marginTop: 20 }]}>
                            <Text style={styles.primaryBtnText}>Download Sample CSV</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.secondaryBtn} onPress={() => setBulkVisible(false)}>
                            <Text style={styles.secondaryBtnText}>Upload File</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </AdminLayout>
    );
};

const InputGroup = ({ label, placeholder, initialValue }) => (
    <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>{label}</Text>
        <TextInput style={styles.input} placeholder={placeholder} defaultValue={initialValue} />
    </View>
);

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 12,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    searchInput: {
        flex: 1,
        height: 48,
        marginLeft: 10,
        fontSize: 16,
    },
    filterBtn: {
        width: 48,
        height: 48,
        backgroundColor: 'white',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    tableHeader: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 12,
    },
    tableHeaderText: {
        fontSize: 12,
        color: '#64748b',
        fontWeight: '500',
    },
    userCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#e2e8f0',
    },
    userName: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1e293b',
    },
    roleBadge: {
        backgroundColor: '#f1f5f9',
        paddingVertical: 4,
        paddingHorizontal: 8,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },
    roleText: {
        fontSize: 12,
        color: '#64748b',
    },
    editBtn: {
        width: 32,
        height: 32,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#1F55A6',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 12,
    },
    addBtn: {
        backgroundColor: 'white',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    addBtnText: {
        color: '#1F55A6',
        fontSize: 12,
        fontWeight: '700',
    },
    bulkActions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingBottom: 20,
    },
    primaryBtn: {
        backgroundColor: '#1F55A6',
        flex: 1,
        height: 52,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    primaryBtnText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 14,
        marginRight: 8,
    },
    secondaryBtn: {
        backgroundColor: 'white',
        flex: 1,
        borderWidth: 1,
        borderColor: '#1F55A6',
        height: 52,
        borderRadius: 12,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
    },
    secondaryBtnText: {
        color: '#1F55A6',
        fontWeight: '700',
        fontSize: 14,
        marginRight: 8,
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'flex-end',
    },
    modalContent: {
        backgroundColor: 'white',
        borderTopLeftRadius: 32,
        borderTopRightRadius: 32,
        padding: 32,
        maxHeight: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1e293b',
        textAlign: 'center',
        marginBottom: 24,
    },
    inputGroup: {
        marginBottom: 20,
    },
    inputLabel: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1F55A6',
        marginBottom: 4,
    },
    input: {
        borderWidth: 1,
        borderColor: '#e2e8f0',
        borderRadius: 10,
        height: 48,
        paddingHorizontal: 16,
        fontSize: 14,
    },
    modalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    modalLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: '#1e293b',
    },
    modalActions: {
        flexDirection: 'row',
        marginTop: 10,
    },
    bulkHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 24,
    },
    uploadArea: {
        borderWidth: 2,
        borderStyle: 'dashed',
        borderColor: '#1F55A6',
        backgroundColor: '#eff6ff',
        borderRadius: 16,
        padding: 32,
        alignItems: 'center',
        marginBottom: 16,
    },
    uploadTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#1e293b',
        marginTop: 16,
    },
    uploadOr: {
        fontSize: 12,
        color: '#64748b',
        marginVertical: 8,
    },
    bulkNote: {
        fontSize: 12,
        color: '#64748b',
        textAlign: 'center',
        lineHeight: 18,
    },
});

export default UserListDashboard;
