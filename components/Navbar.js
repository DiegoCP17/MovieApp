import * as React from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';


const propTypes = {
    main: PropTypes.bool,
  };
  
  const defaultProps = {
    main: false,
  };
  class Navbar extends React.PureComponent {
    state = {};
    render() {
      const {navigation, main} = this.props;
      return (
        <SafeAreaView>
          {main ? (
            <View style={styles.mainNav}>
              <Image
                style={styles.logo}
               
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Search');
                }}>
                <Icon name={'search-outline'} size={30} color="#fff" />
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Icon name={'chevron-back'} size={40} color={Colors.lightGray} />
              </TouchableOpacity>
            </View>
          )}
        </SafeAreaView>
      );
    }
  }
  
  const styles = StyleSheet.create({
    mainNav: {
      flex: 1,
      justifyContent: 'space-between',
      flexDirection: 'row',
      padding: 10,
      alignItems: 'center',
    },
    logo: {
      width: 50,
      height: 50,
    },
  });
  const Colors = {
    backgroundColor: "#5DADE2",
    black: "#000000",
    white: "#ffffff",
    lightGray: "#ccc",
    primary: "#4481FC",
    danger: "#F5365C",
  };
  Navbar.propTypes = propTypes;
  Navbar.defaultProps = defaultProps;
  
  export default Navbar;