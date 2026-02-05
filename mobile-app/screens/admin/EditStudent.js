import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import AdminLayout from '../../components/AdminLayout';
import { InputGroup, PrimaryButton, SecondaryButton } from '../../components/FormComponents';

const EditStudent = ({ navigation, route }) => {
    const { student } = route.params || {};

    const [formData, setFormData] = useState({
        name: student?.name || '',
        school: student?.school || '',
        grade: student?.grade || '',
        dob: student?.dob || '',
        guardianName: student?.guardianName || '',
        guardianPhone: student?.guardianPhone || '',
    });

    const handleUpdate = () => {
        navigation.goBack();
    };

    return (
        <AdminLayout title="Edit Student Profile">
            <ScrollView showsVerticalScrollIndicator={false}>
                <InputGroup
                    label="Full Name"
                    value={formData.name}
                    onChangeText={(text) => setFormData({ ...formData, name: text })}
                />
                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <InputGroup
                            label="Current Grade"
                            value={formData.grade}
                            onChangeText={(text) => setFormData({ ...formData, grade: text })}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <InputGroup
                            label="Date of Birth"
                            value={formData.dob}
                            onChangeText={(text) => setFormData({ ...formData, dob: text })}
                        />
                    </View>
                </View>
                <InputGroup
                    label="School"
                    value={formData.school}
                    onChangeText={(text) => setFormData({ ...formData, school: text })}
                />
                <InputGroup
                    label="Guardian's Name"
                    value={formData.guardianName}
                    onChangeText={(text) => setFormData({ ...formData, guardianName: text })}
                />
                <InputGroup
                    label="Guardian's Phone"
                    value={formData.guardianPhone}
                    onChangeText={(text) => setFormData({ ...formData, guardianPhone: text })}
                />

                <View style={styles.footer}>
                    <PrimaryButton label="Update Profile" onPress={handleUpdate} style={{ flex: 1 }} />
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

export default EditStudent;
