import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
    LayoutDashboard,
    BarChart2,
    Grid,
    FileText
} from 'lucide-react-native';
import { View, Text } from 'react-native';

import Auth from './Auth';

// restoration Screens
import UserListDashboard from './screens/admin/UserListDashboard';
import ManageAppHub from './screens/admin/ManageAppHub';

// Admin screens for sub-navigation
import StudentList from './screens/admin/StudentList';
import SchoolList from './screens/admin/SchoolList';
import SchoolInfo from './screens/admin/SchoolInfo';
import AddSchool from './screens/admin/AddSchool';
import EditSchool from './screens/admin/EditSchool';
import GradingSchool from './screens/admin/GradingSchool';
import AddGrading from './screens/admin/AddGrading';
import EditGrading from './screens/admin/EditGrading';
import AddStudent from './screens/admin/AddStudent';
import ViewStudent from './screens/admin/ViewStudent';
import EditStudent from './screens/admin/EditStudent';
import SponsorStudent from './screens/admin/SponsorStudent';
import ApprovalsList from './screens/admin/ApprovalsList';
import ReportCardList from './screens/admin/ReportCardList';
import GenerateAL from './screens/admin/GenerateAL';
import MarksReview from './screens/admin/MarksReview';
import ViewGenerated from './screens/admin/ViewGenerated';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Placeholder screens for Analytics and Reports
const AnalyticsScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1E293B' }}>Analytics Dashboard</Text>
        <Text style={{ color: '#64748B', marginTop: 8 }}>Coming Soon</Text>
    </View>
);

const ReportsScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f8fafc' }}>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1E293B' }}>Reports Center</Text>
        <Text style={{ color: '#64748B', marginTop: 8 }}>Coming Soon</Text>
    </View>
);

// Nested Stacks
const StudentStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="StudentList" component={StudentList} />
        <Stack.Screen name="AddStudent" component={AddStudent} />
        <Stack.Screen name="ViewStudent" component={ViewStudent} />
        <Stack.Screen name="EditStudent" component={EditStudent} />
        <Stack.Screen name="SponsorStudent" component={SponsorStudent} />
    </Stack.Navigator>
);

const SchoolStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="SchoolList" component={SchoolList} />
        <Stack.Screen name="AddSchool" component={AddSchool} />
        <Stack.Screen name="EditSchool" component={EditSchool} />
        <Stack.Screen name="SchoolInfo" component={SchoolInfo} />
        <Stack.Screen name="GradingSchool" component={GradingSchool} />
        <Stack.Screen name="AddGrading" component={AddGrading} />
        <Stack.Screen name="EditGrading" component={EditGrading} />
    </Stack.Navigator>
);

const ManageStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'slide_from_right' }}>
        <Stack.Screen name="ApprovalsList" component={ApprovalsList} />
        <Stack.Screen name="ReportCardList" component={ReportCardList} />
        <Stack.Screen name="GenerateAL" component={GenerateAL} />
        <Stack.Screen name="MarksReview" component={MarksReview} />
        <Stack.Screen name="ViewGenerated" component={ViewGenerated} />
    </Stack.Navigator>
);

const MainTabs = () => (
    <Tab.Navigator
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: '#1F55A6',
            tabBarInactiveTintColor: '#64748b',
            tabBarStyle: {
                height: 80,
                paddingBottom: 20,
                paddingTop: 10,
                backgroundColor: 'white',
                borderTopWidth: 1,
                borderTopColor: '#e2e8f0',
            },
        }}
    >
        <Tab.Screen
            name="Dashboard"
            component={UserListDashboard}
            options={{
                tabBarLabel: 'Dashboard',
                tabBarIcon: ({ color, size }) => <LayoutDashboard size={24} color={color} />,
            }}
        />
        <Tab.Screen
            name="Analytics"
            component={AnalyticsScreen}
            options={{
                tabBarLabel: 'Analytics',
                tabBarIcon: ({ color, size }) => <BarChart2 size={24} color={color} />,
            }}
        />
        <Tab.Screen
            name="ManageApp"
            component={ManageAppHub}
            options={{
                tabBarLabel: 'Manage App',
                tabBarIcon: ({ color, size }) => <Grid size={24} color={color} />,
            }}
        />
        <Tab.Screen
            name="Reports"
            component={ReportsScreen}
            options={{
                tabBarLabel: 'Reports',
                tabBarIcon: ({ color, size }) => <FileText size={24} color={color} />,
            }}
        />
    </Tab.Navigator>
);

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    if (!isAuthenticated) {
        return <Auth onLogin={(authData) => setIsAuthenticated(authData)} />;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name="MainTabs" component={MainTabs} />
                <Stack.Screen name="StudentStack" component={StudentStack} />
                <Stack.Screen name="SchoolStack" component={SchoolStack} />
                <Stack.Screen name="ManageStack" component={ManageStack} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;
