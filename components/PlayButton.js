import * as React from 'react';
import {Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
class PlayButton extends React.PureComponent {
  render() {
    const {handlePress} = this.props;
    return (
      <Pressable onPress={() => handlePress()} style={styles.button}>
        <Icon name={'caret-forward-outline'} size={30} color={Colors.white} />
      </Pressable>
    );
  }
}
const styles = StyleSheet.create({
  button: {
    alignContent: 'center',
    borderRadius: 50,
    width: 50,
    padding: 10,
    backgroundColor: "#ffc0cb"
  },
});
const Colors = {
  primary: '#FF3366',
  secondary: '#3366FF',
  background: '#ffc0cb',
  text: '#FFFFFF',
  lightGray: '#CCCCCC',
  gray: '#888888',
  dark: '#000000',
  };
;
export default PlayButton;
