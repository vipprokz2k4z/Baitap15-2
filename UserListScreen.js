import React, { useEffect, useState } from 'react';
import { FlatList, Text, View, ActivityIndicator, StyleSheet, Button } from 'react-native';
import axios from 'axios';

const UserListScreen = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <ActivityIndicator style={styles.loader} />;
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Lỗi: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.userContainer}>
            <Text style={styles.text}><Text style={styles.label}>Họ tên:</Text> {item.name}</Text>
            <Text style={styles.text}><Text style={styles.label}>Tên đăng nhập:</Text> {item.username}</Text>
            <Text style={styles.text}><Text style={styles.label}>Email:</Text> {item.email}</Text>
            <Text style={styles.text}>
              <Text style={styles.label}>Địa chỉ:</Text> {item.address.street}, {item.address.city}
            </Text>
            <Text style={styles.text}><Text style={styles.label}>Số điện thoại:</Text> {item.phone}</Text>
            <Text style={styles.text}><Text style={styles.label}>Công ty:</Text> {item.company.name}</Text>
          </View>
        )}
      />
      <Button 
        title="Thêm người dùng mới" 
        onPress={() => navigation.navigate('AddUser')} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#f9f9f9' },
  loader: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  errorText: { color: 'red', fontSize: 18 },
  userContainer: { marginBottom: 16, padding: 10, borderWidth: 1, borderColor: '#ccc', borderRadius: 8, backgroundColor: '#fff' },
  text: { fontSize: 16, marginBottom: 4 },
  label: { fontWeight: 'bold' },
});

export default UserListScreen;
