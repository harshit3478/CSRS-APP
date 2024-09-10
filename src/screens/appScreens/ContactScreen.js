import React from 'react';
import {StatusBar, Text, TextInput, TouchableOpacity, View, FlatList} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../utils/colors';
import HeaderSection from '../../components/HeaderSection';
import Contact from '../../components/Contact';
import { useNavigation } from '@react-navigation/native';
import BackButton from '../../components/BackButton';

const ContactScreen = () => {
  const navigator = useNavigation()
  const contacts = [
    {
      name: 'Dad',
      phone: '9453XXXX15',
      image: 'https://www.pngwing.com/en/free-png-zrzfn',
    },
    {
      name: 'Maa',
      phone: '9453XXXX12',
      image: 'https://www.pngwing.com/en/free-png-zrzfn',
    },
    // Add more contacts as needed
  ];

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <HeaderSection>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <BackButton/>
          <Text style={{marginLeft: 10, color: 'white', fontSize: 18, fontWeight: 'bold' , fontFamily:'Urbanist'}} className="font-urbanist-extrabold">Contacts</Text>
        </View>
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={()=> navigator.navigate("AddContact")}>
          <Icon name="plus" size={20} color="white" />
          <Text style={{color: 'white', fontSize: 16, marginLeft: 5}} className="font-urbanist-extrabold">Add contact</Text>
        </TouchableOpacity>
      </HeaderSection>
      <View style={{padding: 10}}>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: colors.secondary,
            borderRadius: 25,
            paddingHorizontal: 15,
            height: 40,
            marginBottom: 10,
          }}
          placeholder="Search..."
          placeholderTextColor={colors.lightText}
        />
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.name}
          renderItem={({item}) => <Contact name={item.name} phone={item.phone} image={item.image} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default ContactScreen;
