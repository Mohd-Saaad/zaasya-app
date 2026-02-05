import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import AdminLayout from '../../components/AdminLayout';
import { InputGroup, PrimaryButton, SecondaryButton } from '../../components/FormComponents';

const EditSchool = ({ navigation, route }) => {
    const { school } = route.params || {};

    const [formData, setFormData] = useState({
        name: school?.name || '',
        address: school?.address || '',
        city: school?.location || '', // Mapping location to city for now
        contactPerson: school?.contactPerson || '',
        email: school?.email || '',
        phone: school?.phone || '',
        description: school?.description || '',
    });

    const handleUpdate = () => {
        // Logic to update school would go here
        navigation.goBack();
    };

    return (
        <AdminLayout title="Edit School Details">
            <ScrollView showsVerticalScrollIndicator={false}>
                <InputGroup
                    label="School Name"
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
                <InputGroup
                    label="Full Address"
                    value={formData.address}
                    onChangeText={(text) => setFormData({ ...formData, address: text })}
                />
                <InputGroup
                    label="City / State"
                    value={formData.city}
                    onChangeText={(text) => setFormData({ ...formData, city: text })}
                />
                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <InputGroup
                            label="Contact Person"
                            value={formData.contactPerson}
                            onChangeText={(text) => setFormData({ ...formData, contactPerson: text })}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <InputGroup
                            label="Phone"
                            value={formData.phone}
                            onChangeText={(text) => setFormData({ ...formData, phone: text })}
                        />
                    </View>
                </View>
                <InputGroup
                    label="Email Address"
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                />
                <InputGroup
                    label="Brief Description"
                    multiline
                    numberOfLines={4}
                    value={formData.description}
                    onChangeText={(text) => setFormData({ ...formData, description: text })}
                />

                <View style={styles.footer}>
                    <PrimaryButton label="Update Details" onPress={handleUpdate} style={{ flex: 1 }} />
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
    row: {
        flexDirection: 'row',
    },
    footer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 30,
    },
});

export default EditSchool;
