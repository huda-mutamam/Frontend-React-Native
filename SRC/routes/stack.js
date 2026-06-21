import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import semua screen yang akan digunakan
import BronzeScreen from '../screen/BronzeScreen';
import ChatScreen from '../screen/ChatScreen';
import ChatDetailScreen from '../screen/ChatDetailScreen';
import DokumenScreen from '../screen/DokumenScreen';
import DropoffScreen from '../screen/DropoffScreen';
import EwalletPaymentScreen from '../screen/EwalletPaymentScreen';
import FacebookLoginScreen from '../screen/FacebookLoginScreen';
import FoodCategoryScreen from '../screen/FoodCategoryScreen';
import FoodMenuScreen from '../screen/FoodMenuScreen';
import FoodScreen from '../screen/FoodScreen';
import FoodSuccessScreen from '../screen/FoodSuccessScreen';
import GoogleLoginScreen from '../screen/GoogleLoginScreen';
import HomeScreen from '../screen/HomeScreen';
import KargoScreen from '../screen/KargoScreen';
import LoginScreen from '../screen/LoginScreen';
import MembershipScreen from '../screen/MembershipScreen';
import NextDayScreen from '../screen/NextDayScreen';
import NextDaySuccessScreen from '../screen/NextDaySuccessScreen';
import NotificationSettingsScreen from '../screen/NotificationSettingsScreen';
import OnboardingScreen from '../screen/OnboardingScreen';
import OrderScreen from '../screen/OrderScreen';
import PaymentScreen from '../screen/PaymentScreen';
import PaymentSuccessScreen from '../screen/PaymentSuccessScreen';
import PelacakanInternasionalScreen from '../screen/PelacakanInternasionalScreen';
import PetunjukPenggunaanScreen from '../screen/PetunjukPenggunaanScreen';
import PickupScreen from '../screen/PickupScreen';
import PickupSuccessScreen from '../screen/PickupSuccessScreen';
import ProfileScreen from '../screen/ProfileScreen';
import RegisterScreen from '../screen/RegisterScreen';
import RegulerScreen from '../screen/RegulerScreen';
import SamedayScreen from '../screen/SamedayScreen';
import SamedaySuccessScreen from '../screen/SamedaySuccessScreen';
import SettingsScreen from '../screen/SettingsScreen';
import SplashScreen from '../screen/SplashScreen';
import TagihanSayaScreen from '../screen/TagihanSayaScreen';
import VerificationCodeScreen from '../screen/VerificationCodeScreen';
import VirtualAccountPaymentScreen from '../screen/VirtualAccountPaymentScreen';
import VoucherScreen from '../screen/VoucherScreen';
import AlamatTersimpanScreen from '../screen/AlamatTersimpanScreen';
import LacakPesananScreen from '../screen/LacakPesananScreen';
import PusatBantuanScreen from '../screen/PusatBantuanScreen';
import SyaratKetentuanScreen from '../screen/SyaratKetentuanScreen';
import KebijakanPrivasiScreen from '../screen/KebijakanPrivasiScreen';
import EditProfileScreen from '../screen/EditProfileScreen';
import UbahKataSandiScreen from '../screen/UbahKataSandiScreen';
import BahasaScreen from '../screen/BahasaScreen';
import LupaSandiScreen from '../screen/LupaSandiScreen';
import EditOrderScreen from '../screen/EditOrderScreen'

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="VerificationCode" component={VerificationCodeScreen} />
      <Stack.Screen name="GoogleLogin" component={GoogleLoginScreen} />
      <Stack.Screen name="FacebookLogin" component={FacebookLoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="PickupScreen" component={PickupScreen} />
      <Stack.Screen name="PickupSuccessScreen" component={PickupSuccessScreen} />
      <Stack.Screen name="DropoffScreen" component={DropoffScreen} />
      <Stack.Screen name="BronzeScreen" component={BronzeScreen} />
      <Stack.Screen name="VoucherScreen" component={VoucherScreen} />
      <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
      <Stack.Screen name="PaymentSuccessScreen" component={PaymentSuccessScreen} />
      <Stack.Screen name="RegulerScreen" component={RegulerScreen} />
      <Stack.Screen name="DokumenScreen" component={DokumenScreen} />
      <Stack.Screen name="SamedaySuccessScreen" component={SamedaySuccessScreen} />
      <Stack.Screen name="SamedayScreen" component={SamedayScreen} />
      <Stack.Screen name="NextDaySuccessScreen" component={NextDaySuccessScreen} />
      <Stack.Screen name="NextDayScreen" component={NextDayScreen} />
      <Stack.Screen name="KargoScreen" component={KargoScreen} />
      <Stack.Screen name="FoodCategoryScreen" component={FoodCategoryScreen} />
      <Stack.Screen name="FoodMenuScreen" component={FoodMenuScreen} />
      <Stack.Screen name="FoodScreen" component={FoodScreen} />
      <Stack.Screen name="TagihanSayaScreen" component={TagihanSayaScreen} />
      <Stack.Screen name="PelacakanInternasionalScreen" component={PelacakanInternasionalScreen} />
      <Stack.Screen name="OrderScreen" component={OrderScreen} />
      <Stack.Screen name="EditOrderScreen" component={EditOrderScreen} />
      <Stack.Screen name="MembershipScreen" component={MembershipScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
      <Stack.Screen name="ChatDetailScreen" component={ChatDetailScreen} />
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="FoodSuccessScreen" component={FoodSuccessScreen} />
      <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
      <Stack.Screen name="NotificationSettingsScreen" component={NotificationSettingsScreen} />
      <Stack.Screen name="EwalletPaymentScreen" component={EwalletPaymentScreen} />
      <Stack.Screen name="VirtualAccountPaymentScreen" component={VirtualAccountPaymentScreen} />
      <Stack.Screen name="AlamatTersimpanScreen" component={AlamatTersimpanScreen} />
      <Stack.Screen name="LacakPesananScreen" component={LacakPesananScreen} />
      <Stack.Screen name="PusatBantuanScreen" component={PusatBantuanScreen} />
      <Stack.Screen name="SyaratKetentuanScreen" component={SyaratKetentuanScreen} />
      <Stack.Screen name="KebijakanPrivasiScreen" component={KebijakanPrivasiScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
      <Stack.Screen name="UbahKataSandiScreen" component={UbahKataSandiScreen} />
      <Stack.Screen name="BahasaScreen" component={BahasaScreen} />
      <Stack.Screen name="LupaSandiScreen" component={LupaSandiScreen} />
      <Stack.Screen name="PetunjukPenggunaanScreen" component={PetunjukPenggunaanScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;