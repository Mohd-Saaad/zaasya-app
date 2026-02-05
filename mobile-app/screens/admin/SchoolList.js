import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    TextInput,
    FlatList,
} from 'react-native';
import { Search, Plus, School, ChevronRight } from 'lucide-react-native';
import AdminLayout from '../../components/AdminLayout';

const SchoolList = ({ navigation }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [schools, setSchools] = useState([
        { id: 1, name: 'Lincoln High School', location: 'New York, NY', students: 450, rating: 'A' },
        { id: 2, name: 'Washington Prep', location: 'Los Angeles, CA', students: 380, rating: 'B+' },
        { id: 3, name: 'Jefferson Elementary', location: 'Chicago, IL', students: 200, rating: 'A-' },
    ]);

    const SchoolCard = ({ item }) => (
        <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('SchoolInfo', { schoolId: item.id })}
        >
            <View style={styles.cardHeader}>
                <View style={styles.iconContainer}>
                    <School size={24} color="#1F55A6" />
                </View>
                <View style={styles.headerText}>
                    <Text style={styles.schoolName}>{item.name}</Text>
                    <Text style={styles.location}>{item.location}</Text>
                </View>
                <ChevronRight size={20} color="#cbd5e1" />
            </View>
            <View style={styles.cardFooter}>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>Students</Text>
                    <Text style={styles.statValue}>{item.students}</Text>
                </View>
                <View style={styles.stat}>
                    <Text style={styles.statLabel}>Grade</Text>
                    <Text style={[styles.statValue, { color: '#1F55A6' }]}>{item.rating}</Text>
                </View>
                <TouchableOpacity
                    style={styles.gradingBtn}
                    onPress={() => navigation.navigate('GradingSchool', { school: item })}
                >
                    <Text style={styles.gradingBtnText}>View Grading</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );

    const AddButton = () => (
        <TouchableOpacity style={styles.addBtn} onPress={() => navigation.navigate('AddSchool')}>
            <Plus size={20} color="#1F55A6" />
        </TouchableOpacity>
    );

    return (
        <AdminLayout title="School Registry" headerRight={<AddButton />}>
            <View style={styles.searchBar}>
                <Search size={20} color="#64748b" />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search schools..."
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                />
            </View>

            <FlatList
                data={schools.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()))}
                keyExtractor={item => item.id.toString()}
                renderItem={SchoolCard}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </AdminLayout>
    );
};

const styles = StyleSheet.create({
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f1f5f9',
        borderRadius: 16,
        paddingHorizontal: 16,
        marginBottom: 24,
        height: 52,
    },
    searchInput: {
        flex: 1,
        marginLeft: 10,
        fontSize: 15,
        color: '#1e293b',
    },
    card: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 20,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#f1f5f9',
        elevation: 3,
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    iconContainer: {
        width: 52,
        height: 52,
        borderRadius: 16,
        backgroundColor: '#eff6ff',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    headerText: {
        flex: 1,
    },
    schoolName: {
        fontSize: 17,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 2,
    },
    location: {
        fontSize: 13,
        color: '#64748b',
    },
    cardFooter: {
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#f1f5f9',
        paddingTop: 16,
    },
    stat: {
        marginRight: 28,
    },
    statLabel: {
        fontSize: 10,
        color: '#94a3b8',
        textTransform: 'uppercase',
        letterSpacing: 0.8,
        fontWeight: '700',
    },
    statValue: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1e293b',
        marginTop: 4,
    },
    gradingBtn: {
        marginLeft: 'auto',
        backgroundColor: '#f8fafc',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: '#f1f5f9',
    },
    gradingBtnText: {
        fontSize: 12,
        fontWeight: '700',
        color: '#1F55A6',
    },
    addBtn: {
        backgroundColor: '#FFFFFF22',
        width: 40,
        height: 40,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#FFFFFF44',
    },
});

export default SchoolList;
