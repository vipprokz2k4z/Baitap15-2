import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import UserListScreen from './UserListScreen';
import AddUserScreen from './AddUserScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="UserList">
        <Stack.Screen name="UserList" component={UserListScreen} options={{ title: 'Danh sách người dùng' }} />
        <Stack.Screen name="AddUser" component={AddUserScreen} options={{ title: 'Thêm người dùng' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
