import React from 'react';
import { Button } from '@real-estate/shared-ui';

export const SharedComponentExample: React.FC = () => {
  const handleButtonPress = () => {
    alert('Shared component is working on web!');
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
      <h2>Shared Components Demo</h2>
      
      <Button
        title="Shared Button (Primary)"
        onPress={handleButtonPress}
        variant="primary"
        size="medium"
      />
      
      <Button
        title="Shared Button (Secondary)"
        onPress={handleButtonPress}
        variant="secondary"
        size="large"
      />
      
      <Button
        title="Loading Button"
        onPress={handleButtonPress}
        variant="outline"
        loading={true}
      />
    </div>
  );
};