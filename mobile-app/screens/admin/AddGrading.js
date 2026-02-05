import React, { useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import AdminLayout from '../../components/AdminLayout';
import { InputGroup, PrimaryButton, SecondaryButton } from '../../components/FormComponents';

const AddGrading = ({ navigation, route }) => {
    const { schoolId } = route.params || {};
    const [formData, setFormData] = useState({
        subject: '',
        grade: '',
        year: '2023',
        comments: '',
    });

    const handleSave = () => {
        navigation.goBack();
    };

    return (
        <AdminLayout title="Add Grading Record">
            <ScrollView showsVerticalScrollIndicator={false}>
                <InputGroup
                    label="Subject"
                    placeholder="e.g. Mathematics"
                    value={formData.subject}
                    onChangeText={(text) => setFormData({ ...formData, subject: text })}
                />
                <View style={styles.row}>
                    <View style={{ flex: 1, marginRight: 10 }}>
                        <InputGroup
                            label="Grade / Score"
                            placeholder="e.g. A+"
                            value={formData.grade}
                            onChangeText={(text) => setFormData({ ...formData, grade: text })}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <InputGroup
                            label="Academic Year"
                            placeholder="2023"
                            value={formData.year}
                            onChangeText={(text) => setFormData({ ...formData, year: text })}
                        />
                    </View>
                </View>
                <InputGroup
                    label="Comments / Feedback"
                    placeholder="Enter details about performance..."
                    multiline
                    numberOfLines={4}
                    value={formData.comments}
                    onChangeText={(text) => setFormData({ ...formData, comments: text })}
                />

                <View style={styles.footer}>
                    <PrimaryButton label="Save Recording" onPress={handleSave} style={{ flex: 1 }} />
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

export default AddGrading;
