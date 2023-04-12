import {StyleSheet} from 'react-native';
import {globalUnits} from '../../theme/globalStyles';

const styles = StyleSheet.create({
  container: {},
  inputContainer: {height: globalUnits.inputHeight},

  input: {
    flex: 1,
    height: '100%',

    fontWeight: 'bold',
  },

  calenderHeaderText: {
    fontWeight: 'bold',
  },
});

export default styles;
