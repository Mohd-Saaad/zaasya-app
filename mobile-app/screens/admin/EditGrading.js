import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import AdminLayout from '../../components/AdminLayout';
import { InputGroup, PrimaryButton, SecondaryButton } from '../../components/FormComponents';

const EditGrading = ({ navigation, route }) => {
    const { grading } = route.params || {};
    const [formData, setFormData] = useState({
        subject: grading?.subject || '',
        grade: grading?.grade || '',
        year: grading?.year || '2023',
        comments: grading?.comments || '',
    });

    const handleUpdate = () => {
        navigation.goBack();
    };

    return (
        <AdminLayout title="Edit Grading">
            <ScrollView showsVerticalScrollIndicator={false}>
                <InputGroup
                    label="Subject"
                    value={formData.subject}
                    onChangeText={(text) => setFormData({ ...formData, subject: text })}
                />
                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <InputGroup
                            label="Grade / Score"
                            value={formData.grade}
                            onChangeText={(text) => setFormData({ ...formData, grade: text })}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <InputGroup
                            label="Academic Year"
                            value={formData.year}
                            onChangeText={(text) => setFormData({ ...formData, year: text })}
                        />
                    </View>
                </View>
                <InputGroup
                    label="Comments / Feedback"
                    multiline
                    numberOfLines={4}
                    value={formData.comments}
                    onChangeText={(text) => setFormData({ ...formData, comments: text })}
                />

                <View style={styles.footer}>
                    <PrimaryButton label="Update Record" onPress={handleUpdate} style={{ flex: 1 }} />
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

export default EditGrading;
