import {StyleSheet} from 'react-native';
import {dimensions} from '../../../utils/constants';

const {width} = dimensions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // marginTop: -200,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  rowSB: {
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  cutOutCenter: {
    width: width / 2.6,
    height: 15,
    backgroundColor: 'transparent',
    alignSelf: 'center',
    paddingTop: 4,
  },
  cutOutItem: {
    width: width / 3.1,
    height: 15,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderTopLeftRadius: 8,
  },
  cutOutItemRight: {
    width: width / 3.1,
    height: 15,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderTopRightRadius: 8,
  },
  triangle: {
    position: 'absolute',
    bottom: 0,
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderTopWidth: 0,
    borderTopColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
    borderLeftColor: 'transparent',
  },

  rightTriangle: {
    right: 0,
    borderRightWidth: 0,
    borderBottomWidth: 14,
    borderLeftWidth: 24,
  },
  leftTriangle: {
    left: 0,
    borderRightWidth: 24,
    borderBottomWidth: 14,
    borderLeftWidth: 0,
  },
  centerBar: {
    width: 60,
    height: 4,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
  },

  mapContainer: {
    position: 'relative',
  },
  mapOverflow: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    // borderWidth: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  userLocationInfo: {
    borderWidth: 2,
  },
});

export default styles;
