import Text from '../../../../../components/Text/CustomText';
import Box from '../../../../../components/View/CustomView';

export const EmptyItem = () => {
  return (
    <Box flex={1} justifyContent="center" alignItems="center" mt="xl">
      <Text variant="body_sm" ml="s">
        No Menu Data
      </Text>
    </Box>
  );
};
export const SectionHeader = ({section: {title}}) => {
  return (
    <Box alignSelf="flex-start">
      <Text
        variant="body_bold"
        marginTop="l"
        mb="s"
        textTransform="uppercase"
        letterSpacing={2}>
        {title}
      </Text>
    </Box>
  );
};
