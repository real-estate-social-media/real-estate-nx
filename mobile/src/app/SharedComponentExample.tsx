import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button } from '@real-estate/shared-ui';

export const SharedComponentExample: React.FC = () => {
  const handleButtonPress = () => {
    Alert.alert('Success!', 'Shared component is working!');
  };

  return (
    <View style={styles.container}>
      <Button
        title="Shared Button (Primary)"
        onPress={handleButtonPress}
        variant="primary"
        size="medium"
      />
      
      <View style={styles.spacer} />
      
      <Button
        title="Shared Button (Secondary)"
        onPress={handleButtonPress}
        variant="secondary"
        size="large"
      />
      
      <View style={styles.spacer} />
      
      <Button
        title="Loading Button"
        onPress={handleButtonPress}
        variant="outline"
        loading={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    height: 20,
  },
});