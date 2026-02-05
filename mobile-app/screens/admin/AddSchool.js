import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, Text } from 'react-native';
import AdminLayout from '../../components/AdminLayout';
import { InputGroup, PrimaryButton, SecondaryButton } from '../../components/FormComponents';

const AddSchool = ({ navigation }) => {
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        city: '',
        contactPerson: '',
        email: '',
        phone: '',
        description: '',
    });

    const handleSave = () => {
        // Logic to save school would go here
        navigation.goBack();
    };

    return (
        <AdminLayout title="Add New School">
            <ScrollView showsVerticalScrollIndicator={false}>
                <InputGroup
                    label="School Name"
                    placeholder="Enter school name"
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
                <InputGroup
                    label="Full Address"
                    placeholder="Enter school address"
                    value={formData.address}
                    onChangeText={(text) => setFormData({ ...formData, address: text })}
                />
                <InputGroup
                    label="City / State"
                    placeholder="e.g. New York, NY"
                    value={formData.city}
                    onChangeText={(text) => setFormData({ ...formData, city: text })}
                />
                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <InputGroup
                            label="Contact Person"
                            placeholder="Name"
                            value={formData.contactPerson}
                            onChangeText={(text) => setFormData({ ...formData, contactPerson: text })}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <InputGroup
                            label="Phone"
                            placeholder="+1..."
                            value={formData.phone}
                            onChangeText={(text) => setFormData({ ...formData, phone: text })}
                        />
                    </View>
                </View>
                <InputGroup
                    label="Email Address"
                    placeholder="school@example.com"
                    value={formData.email}
                    onChangeText={(text) => setFormData({ ...formData, email: text })}
                />
                <InputGroup
                    label="Brief Description"
                    placeholder="Enter school details..."
                    multiline
                    numberOfLines={4}
                    value={formData.description}
                    onChangeText={(text) => setFormData({ ...formData, description: text })}
                />

                <View style={styles.footer}>
                    <PrimaryButton label="Create School" onPress={handleSave} style={{ flex: 1 }} />
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

export default AddSchool;
