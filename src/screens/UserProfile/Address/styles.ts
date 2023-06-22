import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  myLocationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 8,
    marginRight: 20,

    borderBottomWidth: 1,
    alignSelf: 'flex-end',
  },
  markerIcon: {height: 32, width: 32, resizeMode: 'contain'},
  inputContainer: {
    flex: 1,
    width: '95%',
    alignSelf: 'center',
    zIndex: 1,
  },
  autoCompleteInput: {
    placeholderTextColor: 'lightgray',
    returnKeyType: 'search',
    borderWidth: 1,
    borderColor: 'gray',
  },
});

export default styles;
