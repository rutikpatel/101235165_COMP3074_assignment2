import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
} from 'react-native';

 const AboutScreen= ({ navigation }) => {
  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{ flex: 1, padding: 16 }}>
          <Text
            style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16
            }}>
            Rutikkumar Patel 
          </Text>
          <Text style={{
              fontSize: 25,
              textAlign: 'center',
              marginBottom: 16
            }}>101235165</Text>
      </View>
    </SafeAreaView>
  );
}
export default AboutScreen;
