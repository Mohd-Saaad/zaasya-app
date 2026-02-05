import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList,
    Alert,
} from 'react-native';
import { FileText, Download, Share2, Search, Filter } from 'lucide-react-native';
import AdminLayout from '../../components/AdminLayout';

const ViewGenerated = ({ navigation }) => {
    const [documents, setDocuments] = useState([
        { id: 1, name: 'AL_Emily_Johnson.pdf', type: 'Admission Letter', date: '2024-02-03', size: '156 KB' },
        { id: 2, name: 'RC_Term1_Lincoln High.pdf', type: 'Report Card', date: '2024-02-02', size: '2.1 MB' },
        { id: 3, name: 'AL_Michael_Brown.pdf', type: 'Admission Letter', date: '2024-01-28', size: '154 KB' },
    ]);

    const handleDownload = (name) => {
        Alert.alert('Download', `Downloading ${name}...`);
    };

    const handleShare = (name) => {
        Alert.alert('Share', `Preparing to share ${name}...`);
    };

    const DocCard = ({ item }) => (
        <View style={styles.card}>
            <View style={styles.iconContainer}>
                <FileText size={28} color="#1F55A6" />
            </View>
            <View style={styles.content}>
                <Text style={styles.docName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.docType}>{item.type}</Text>
                <View style={styles.meta}>
                    <Text style={styles.metaText}>{item.date}</Text>
                    <Text style={styles.dot}>•</Text>
                    <Text style={styles.metaText}>{item.size}</Text>
                </View>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity style={styles.actionBtn} onPress={() => handleDownload(item.name)}>
                    <Download size={18} color="#64748b" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.actionBtn} onPress={() => handleShare(item.name)}>
                    <Share2 size={18} color="#64748b" />
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <AdminLayout title="Repository">
            <View style={styles.controls}>
                <TouchableOpacity style={styles.controlBtn}>
                    <Search size={20} color="#1F55A6" />
                    <Text style={styles.controlText}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.controlBtn}>
                    <Filter size={20} color="#1F55A6" />
                    <Text style={styles.controlText}>Filter</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={documents}
                keyExtractor={item => item.id.toString()}
                renderItem={DocCard}
                contentContainerStyle={{ paddingBottom: 20 }}
                ListHeaderComponent={<Text style={styles.listTitle}>Recently Generated</Text>}
            />
        </AdminLayout>
    );
};

const styles = StyleSheet.create({
    controls: {
        flexDirection: 'row',
        marginBottom: 24,
    },
    controlBtn: {
        flex: 1,
        flexDirection: 'row',
        height: 52,
        backgroundColor: '#eff6ff',
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 6,
    },
    controlText: {
        marginLeft: 8,
        fontSize: 15,
        fontWeight: '600',
        color: '#1F55A6',
    },
    listTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 16,
        marginLeft: 4,
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
        elevation: 2,
        shadowColor: '#64748b',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
    },
    iconContainer: {
        width: 56,
        height: 56,
        borderRadius: 16,
        backgroundColor: '#f8fafc',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    content: {
        flex: 1,
    },
    docName: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1e293b',
        marginBottom: 2,
    },
    docType: {
        fontSize: 13,
        color: '#1F55A6',
        fontWeight: '600',
        marginBottom: 4,
    },
    meta: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    metaText: {
        fontSize: 12,
        color: '#94a3b8',
    },
    dot: {
        marginHorizontal: 6,
        color: '#cbd5e1',
    },
    actions: {
        flexDirection: 'row',
    },
    actionBtn: {
        width: 36,
        height: 36,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
    }
});

export default ViewGenerated;
