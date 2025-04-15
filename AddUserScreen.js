import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';

const AddUserScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleAddUser = () => {
    const userData = {
      name,
      username,
      email,
      address: { street: address },
      phone,
      company: { name: company },
    };

    axios.post('https://jsonplaceholder.typicode.com/users', userData)
      .then(response => {
        setResponseMessage('Thêm người dùng thành công!');
        navigation.replace('UserList'); // Quay lại màn hình danh sách sau khi thêm thành công
      })
      .catch(err => setResponseMessage(`Lỗi: ${err.message}`));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Nhập họ tên"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập tên đăng nhập"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập địa chỉ (đường)"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập số điện thoại"
        value={phone}
        onChangeText={setPhone}
      />
      <TextInput
        style={styles.input}
        placeholder="Nhập tên công ty"
        value={company}
        onChangeText={setCompany}
      />
      <Button title="Thêm người dùng" onPress={handleAddUser} />
      {responseMessage && <Text style={styles.message}>{responseMessage}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 16,
    borderRadius: 4,
    borderColor: '#ccc',
  },
  message: {
    marginTop: 16,
    color: 'green',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default AddUserScreen;
