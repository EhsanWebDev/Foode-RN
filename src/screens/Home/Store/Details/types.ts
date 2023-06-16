import {ImageURISource} from 'react-native';

export type CategoryItem = {
  title: string;
  data: [];
};

export type InfoRowProps = {
  title: string;
  image: string | undefined;
  onPress: () => void;
};
