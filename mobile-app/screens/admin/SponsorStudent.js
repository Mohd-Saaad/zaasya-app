import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Switch } from 'react-native';
import AdminLayout from '../../components/AdminLayout';
import { InputGroup, PrimaryButton, SecondaryButton } from '../../components/FormComponents';

const SponsorStudent = ({ navigation, route }) => {
    const { student } = route.params || {};

    const [formData, setFormData] = useState({
        isSponsored: student?.isSponsored || false,
        sponsorName: student?.sponsorName || '',
        sponsorType: 'Organization',
        amount: '1000',
        startDate: '01/01/2023',
        notes: '',
    });

    const handleSave = () => {
        navigation.goBack();
    };

    return (
        <AdminLayout title="Sponsorship Management">
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.toggleRow}>
                    <View>
                        <Text style={styles.toggleLabel}>Active Sponsorship</Text>
                        <Text style={styles.toggleSub}>Currently receiving aid</Text>
                    </View>
                    <Switch
                        value={formData.isSponsored}
                        onValueChange={(val) => setFormData({ ...formData, isSponsored: val })}
                        trackColor={{ false: '#cbd5e1', true: '#1F55A6' }}
                    />
                </View>

                {formData.isSponsored && (
                    <View style={styles.formSection}>
                        <InputGroup
                            label="Sponsor Name"
                            placeholder="Enter sponsor details"
                            value={formData.sponsorName}
                            onChangeText={(text) => setFormData({ ...formData, sponsorName: text })}
                        />
                        <InputGroup
                            label="Sponsorship Type"
                            placeholder="e.g. Full / Partial"
                            value={formData.sponsorType}
                            onChangeText={(text) => setFormData({ ...formData, sponsorType: text })}
                        />
                        <View style={styles.row}>
                            <View style={{ flex: 1, marginRight: 10 }}>
                                <InputGroup
                                    label="Monthly Amount"
                                    placeholder="$"
                                    value={formData.amount}
                                    onChangeText={(text) => setFormData({ ...formData, amount: text })}
                                />
                            </View>
                            <View style={{ flex: 1 }}>
                                <InputGroup
                                    label="Start Date"
                                    placeholder="DD/MM/YYYY"
                                    value={formData.startDate}
                                    onChangeText={(text) => setFormData({ ...formData, startDate: text })}
                                />
                            </View>
                        </View>
                        <InputGroup
                            label="Administrative Notes"
                            multiline
                            numberOfLines={3}
                            value={formData.notes}
                            onChangeText={(text) => setFormData({ ...formData, notes: text })}
                        />
                    </View>
                )}

                <View style={styles.footer}>
                    <PrimaryButton label="Save Changes" onPress={handleSave} style={{ flex: 1 }} />
                    <SecondaryButton
                        label="Cancel"
                        onPress={() => navigation.goBack()}
                        style={{ flex: 1, marginLeft: 12 }}
                    />
                </View>
            </ScrollView>
        </AdminLayout>
    );
};

const styles = StyleSheet.create({
    toggleRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#e2e8f0',
        marginBottom: 20,
    },
    toggleLabel: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1e293b',
    },
    toggleSub: {
        fontSize: 12,
        color: '#64748b',
        marginTop: 2,
    },
    formSection: {
        marginTop: 10,
    },
    row: {
        flexDirection: 'row',
    },
    footer: {
        flexDirection: 'row',
        marginTop: 20,
        marginBottom: 30,
    },
});

export default SponsorStudent;
