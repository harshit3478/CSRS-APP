import {useNavigation} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  Alert,
  BackHandler,
  Pressable,
  ScrollView,
  StatusBar,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';
import colors from '../../utils/colors';
import {Avatar} from '../../components/Avatar';
import HeaderSection from '../../components/HeaderSection';
import {useForm, Controller} from 'react-hook-form';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useAuth} from '../../context/authenticationContext';
import BackButton from '../../components/BackButton';

export default function EditProfileScreen({route}) {
  const title = route.params.title || 'Edit Profile';
  const navigation = useNavigation();
  const {control, handleSubmit, watch} = useForm();
  const {user, login} = useAuth();
  const {email, phone, hall, address, username, rollNo, imageUrl} = user.data;
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isFormChanged, setIsFormChanged] = useState(false); // State to track form changes

  // Split address into parts: Address Line, City, State, and Pincode
  const addressParts = address ? address.split(', ') : ['', '', ''];
  const addressLine = addressParts[0] || '';
  const city = addressParts[1] || '';
  const stateAndPincode = addressParts[2] ? addressParts[2].split(' - ') : ['', ''];
  const state = stateAndPincode[0] || '';
  const pincode = stateAndPincode[1] || '';

  // Watch form values to detect changes
  const formValues = watch();

  // Effect to detect changes in form values
  useEffect(() => {
    const initialValues = {
      name: username,
      phone: phone,
      rollNo: rollNo,
      hall: hall,
      address: addressLine,
      city: city,
      state: state,
      pincode: pincode,
    };
    // console.log('formchanged', formValues, initialValues,isFormChanged);
    // Check if the current form values differ from the initial values
    const hasChanged = Object.keys(initialValues).some(
      (key) => formValues[key] !== initialValues[key]
    );
    setIsFormChanged(hasChanged || selectedImage);
  }, [formValues, username, phone, rollNo, hall, addressLine, city, state, pincode]);

  const handleImageChange = (image) => {
    setSelectedImage(image);
    console.log('Selected Image:', image);
  };

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const {name, phone, rollNo, hall, address, state, city, pincode} = data;

      // Create FormData to handle file and form inputs
      const formData = new FormData();
      formData.append('email', email);
      formData.append('name', name);
      formData.append('phone', phone);
      formData.append('rollNo', rollNo);
      formData.append('hall', hall);
      formData.append('address', `${address}, ${city}, ${state} - ${pincode}`);
      
      // Check if a new image has been selected and add it to FormData
      if (selectedImage && selectedImage.path) {
        formData.append('image', {
          uri: selectedImage.path,
          type: selectedImage.mime || 'image/jpeg', // Default to jpeg if mime type is missing
          name: selectedImage.path.split('/').pop(), // Extracts the filename from the path
        });
      }
      // console.log("api url is " , process.env.API_URL)
      const response = await fetch(`${process.env.API_URL}/user/v2/update/profile`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${user.token}`, // Include only the Authorization header, Content-Type is set automatically for FormData
        },
        body: formData,
      });

      const result = await response.json();
      console.log(result);

      if (result.isSuccess) {
        login(result.data); // Update context with new user data
        ToastAndroid.show('Profile updated successfully', ToastAndroid.LONG);
        navigation.navigate('Profile');
      } else {
        ToastAndroid.show('Profile update failed: ' + result.message, ToastAndroid.LONG);
      }
    } catch (error) {
      // Alert.alert('Error', error.message || 'Something went wrong');
      ToastAndroid.show('Error', error.message || 'Something went wrong' , ToastAndroid.LONG);
    } finally {
      setLoading(false);
    }
  };

  // Disable back navigation when loading
  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      if (loading) {
        return true; // Disable back button
      }
      return false; // Allow back navigation
    });

    return () => backHandler.remove();
  }, [loading]);

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
        <HeaderSection>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <BackButton/>
            <Text
              style={{
                marginLeft: 10,
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: 'Urbanist',
              }}
              className="font-urbanist-extrabold">
              {title}
            </Text>
          </View>
        </HeaderSection>
        <ScrollView style={{padding: 0}}>
          <View className="profile-section items-center">
            <View
              className="w-[140] h-[140] rounded-full bg-white mx-auto my-5 justify-center items-center"
              style={{elevation: 10}}>
              <Avatar
                source={
                  selectedImage
                    ? {uri: selectedImage.path}
                    : imageUrl
                    ? {uri: imageUrl}
                    : require('../../../assets/profile.png')
                }
                onChange={handleImageChange}
                disabled={loading}
              />
            </View>
            <Text className="text-3xl text-black font-urbanist-extrabold">
              {username}
            </Text>
            <Text
              className="text-xl font-urbanist-medium"
              style={{color: colors.primary}}>
              {rollNo}
            </Text>
            <Text className="text-lg text-gray-800 font-urbanist-medium">
              {email}
            </Text>
          </View>
          <View className="details-section p-5">
            <CustomInput
              control={control}
              name="name"
              placeholder="Enter your name"
              keyboardType="default"
              defaultValue={username}
              icon="pencil"
              rules={{
                required: 'Name is required',
                minLength: {
                  value: 2,
                  message: 'Name must be at least 2 characters long',
                },
                pattern: {
                  value: /^[a-zA-Z\s]+$/,
                  message: 'Name must contain only letters and spaces',
                },
              }}
            />
            <CustomInput
              control={control}
              name="phone"
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
              defaultValue={phone}
              icon="pencil"
              rules={{
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10}$/,
                  message: 'Phone number must be exactly 10 digits',
                },
              }}
            />
            <CustomInput
              control={control}
              name="rollNo"
              placeholder="Roll Number"
              keyboardType="default"
              defaultValue={rollNo}
              icon="pencil"
              rules={{
                required: 'Roll No is required',
                pattern: {
                  value: /^[0-9]{2}[A-Z]{2}[0-9]{5}$/,
                  message: 'Roll No must be in the format YYXX00000 (e.g., 22CE10029)',
                },
              }}
            />
            <CustomInput
              control={control}
              name="hall"
              placeholder="Hall of Residence"
              keyboardType="default"
              defaultValue={hall}
              rules={{
                required: 'Hall of Residence is required',
                minLength: {
                  value: 2,
                  message: 'Hall name must be at least 2 characters long',
                },
              }}
            />
            <View className="flex-row justify-between items-center my-4">
              <Text className="text-2xl font-semibold font-urbanist-medium text-black">
                Address
              </Text>
              <View className="flex-1 ml-2 h-.5 border-b border-slate-400"></View>
            </View>
            <CustomInput
              control={control}
              name="address"
              label="Address"
              placeholder="Address Line 1"
              keyboardType="default"
              defaultValue={addressLine}
              rules={{
                required: 'Address is required',
                minLength: {
                  value: 5,
                  message: 'Address must be at least 5 characters long',
                },
              }}
            />
            <CustomInput
              control={control}
              name="city"
              label="City"
              placeholder="City"
              keyboardType="default"
              defaultValue={city}
              rules={{
                required: 'City is required',
                minLength: {
                  value: 2,
                  message: 'City name must be at least 2 characters long',
                },
              }}
            />
            <CustomInput
              control={control}
              name="state"
              label="State"
              placeholder="State"
              keyboardType="default"
              defaultValue={state}
              rules={{
                required: 'State is required',
                minLength: {
                  value: 2,
                  message: 'State name must be at least 2 characters long',
                },
              }}
            />
            <CustomInput
              control={control}
              name="pincode"
              label="Pincode"
              placeholder="Pincode"
              keyboardType="number-pad"
              defaultValue={pincode}
              rules={{
                required: 'Pincode is required',
                pattern: {
                  value: /^[0-9]{6}$/,
                  message: 'Pincode must be exactly 6 digits',
                },
              }}
            />

            <View className="flex-row w-full justify-around">
              <View className="flex-1 pr-5">
                <CustomButton
                  onPress={() => navigation.goBack()}
                  title="Cancel"
                  type="OUTLINED"
                  disabled={loading}
                />
              </View>
              <View className="flex-1">
                <CustomButton
                  onPress={handleSubmit(onSubmit)}
                  title="Save"
                  loading={loading}
                  disabled={loading || !isFormChanged} // Disable when loading or no changes
                />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
