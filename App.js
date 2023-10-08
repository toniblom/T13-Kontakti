import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, FlatList } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();

    if (status === 'granted') {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers]
      })

      if (data.length > 0) {
        setContacts(data);
        console.log(data);
      }
    }
  }

  return (

    <View style={styles.container} >
        <FlatList
          data={contacts}
          renderItem={({ item }) => <Text>{item.name} : {item.phoneNumbers[0].number}</Text>}
          keyExtractor={(item, index) => index.toString()}
        />
      <View style={styles.button}>
        <Button title="Get contacts" onPress={getContacts} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
  },
  button: {
    marginBottom: 10,
  },
});
