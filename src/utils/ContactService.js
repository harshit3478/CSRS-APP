import {ToastAndroid} from 'react-native';
import Config from 'react-native-config';


class ContactService {
   API_URL = Config.API_URL;
  async addContactAPI(userId, name, phone, addContact, navigation) {
    // Add contact to server and then to context in format
    // { id : _id , name : name  , phone : phone , image : imageUrl ? imageUrl : ""}
    try {
      const response = await fetch(`${API_URL}/contacts/v1/add`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: userId, name, phone}),
      });
      const result = await response.json();
      console.log("result of add contact api request " , result);

      if (response.ok) {
        const data = result.data;
        const contact = {
          id: data._id,
          name : data.name,
          phone : data.phone,
          image : data.imageUrl ? data.imageUrl : "",
        };
        addContact(contact);
        console.log('Contact added', contact);
        navigation.goBack();
      } else {
        console.log('Error adding contact:', result.message);
        ToastAndroid.show(
          'Error adding contact: ' + result.message,
          ToastAndroid.LONG,
        );
      }
    } catch (error) {
      console.log('Error adding contact:', error);
      ToastAndroid.show(
        'Error adding contact: ' + error.message,
        ToastAndroid.LONG,
      );
    }
  }

  async deleteContactAPI(userID, contactID, phone, removeContact) {
    try {
      const response = await fetch(`${API_URL}/contacts/v1/delete`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: userID, phone}),
      });
      const result = await response.json();
      console.log('result of delete contact api request ' , result);
      if (response.ok) {
        ToastAndroid.show('Contact deleted successfully', ToastAndroid.LONG);
        removeContact(contactID);
        
      } else if(result.code === 400){
        // contact not found
        // delete the contact from local storage
        removeContact(contactID);
        ToastAndroid.show(
          'Contact not found in server, deleting from local storage', ToastAndroid.LONG
        )
      }
      else {
        console.log('Error deleting contact:', result.message);
        ToastAndroid.show(
          'Error deleting contact: ' + result.message,
          ToastAndroid.LONG,
        );
      }
    } catch (error) {
      console.log('Error deleting contact:', error);
      ToastAndroid.show(
        'Error deleting contact: ' + error.message,
        ToastAndroid.LONG,
      );
    }
  }

  async updateContactAPI(userId) {
    const response = await fetch(`${API_URL}/contacts/v1/update`, {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({id: userId}),
    });
    const result = await response.json();
    console.log('user ID:', userId);
    if (response.ok) {
      console.log('Contact updated successfully');

    } else {
      console.log('Error updating contact:', result.message);
    }
  }

  async getContactsAPI(userId, addContact,clearContacts) {
    // delete all contacts from asyncstorage beforehand fetching contacts from server 
    clearContacts();
    try {
      const response = await fetch(`${API_URL}/contacts/v1/get`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: userId}),
      });
      const result = await response.json();
      console.log("contacts fetched in contactServices" , result);
      if (response.ok) {
        const FetchedContacts = result.data;        
        FetchedContacts.forEach(con => {
            const contact = {
                id : con._id,
                name : con.name,
                phone : con.phone,
                image : con.imageUrl ? con.imageUrl : ""
            }
            addContact(contact);
            console.log("contact added : " , contact)
        });
      } else {
        console.log('Error getting contacts:', result.message);
        ToastAndroid.show(
          'Error getting contacts: ' + result.message,
          ToastAndroid.LONG,
        );
      }
    } catch (error) {
      console.log('Error getting contacts:', error);
      ToastAndroid.show(
        'Error getting contacts: ' + error.message,
        ToastAndroid.LONG,
      );
    }
  }
}

export default new ContactService();
