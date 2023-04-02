//================================ React Native Imported Files ======================================//

import React from 'react';
import { View} from 'react-native';


//================================ Local Imported Files ======================================//

import RootStack from './src/screens/RootStack/RootStack';
import FirebaseHelper from './src/firebase/FirebaseHelper';
import InAppNotification from './src/firebase/InAppNotification/view';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
    FirebaseHelper.addNotificationListener();
  }

  render() {
    return (
        <View style={{flex:1}}>
        <RootStack />
          <InAppNotification
              vibrate
              interval={4000}
              onPress={(remoteMessage) => {
                console.log('remoteMessage',remoteMessage)
              }}
          />
        </View>
    )
  }
}

export default App;
