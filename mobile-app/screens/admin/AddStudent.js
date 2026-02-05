import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import AdminLayout from '../../components/AdminLayout';
import { InputGroup, PrimaryButton, SecondaryButton } from '../../components/FormComponents';

const AddStudent = ({ navigation }) => {
    const [formData, setFormData] = useState({
        name: '',
        dob: '',
        gender: '',
        school: '',
        grade: '',
        guardianName: '',
        guardianPhone: '',
        address: '',
    });

    const handleSave = () => {
        navigation.goBack();
    };

    return (
        <AdminLayout title="Add New Student">
            <ScrollView showsVerticalScrollIndicator={false}>
                <InputGroup
                    label="Full Name"
                    placeholder="Student's name"
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <InputGroup
                            label="Date of Birth"
                            placeholder="DD/MM/YYYY"
                            value={formData.dob}
                            onChangeText={(text) => setFormData({ ...formData, dob: text })}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <InputGroup
                            label="Gender"
                            placeholder="Male/Female"
                            value={formData.gender}
                            onChangeText={(text) => setFormData({ ...formData, gender: text })}
                        />
                    </View>
                </View>
                <InputGroup
                    label="School Assignment"
                    placeholder="Select School"
                    value={formData.school}
                    onChangeText={(text) => setFormData({ ...formData, school: text })}
                />
                <InputGroup
                    label="Current Grade"
                    placeholder="e.g. 10th Grade"
                    value={formData.grade}
                    onChangeText={(text) => setFormData({ ...formData, grade: text })}
                />
                <InputGroup
                    label="Guardian's Name"
                    placeholder="Enter parent/guardian name"
                    value={formData.guardianName}
                    onChangeText={(text) => setFormData({ ...formData, guardianName: text })}
                />
                <InputGroup
                    label="Guardian's Phone"
                    placeholder="+1..."
                    value={formData.guardianPhone}
                    onChangeText={(text) => setFormData({ ...formData, guardianPhone: text })}
                />
                <InputGroup
                    label="Residential Address"
                    placeholder="Enter address"
                    multiline
                    numberOfLines={3}
                    value={formData.address}
                    onChangeText={(text) => setFormData({ ...formData, address: text })}
                />

                <View style={styles.footer}>
                    <PrimaryButton label="Register Student" onPress={handleSave} style={{ flex: 1 }} />
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

export default AddStudent;
