//  <Box>
//         <Header label="Checkout" onBackPress={navigation.goBack} />
//         <Box mt="l">

//           <Card variant="primary">
//             <Box p="s_m">
//               <Box
//                 flexDirection="row"
//                 alignItems="center"
//                 justifyContent="space-between">
//                 <Box flexDirection="row" alignItems="center">
//                   <Icon
//                     name="location"
//                     color={colors.primary}
//                     size={globalUnits.icon_LG}
//                   />

//                   <Text ml="s" variant="body_bold">
//                     Delivery address
//                   </Text>
//                 </Box>
//                 <IconButton
//                   variant="text"
//                   icon="pencil"
//                   iconFamily="MaterialCommunityIcons"
//                   style={{
//                     width: globalUnits.icon_LG,
//                     height: globalUnits.icon_LG,
//                   }}
//                   onPress={() => navigation.navigate('AddAddress')}
//                 />
//               </Box>
//               <Box mt="s">
//                 {addressSelected ? (
//                   <Text variant="body_sm" numberOfLines={3}>
//                     <Text variant="body_sm_bold" letterSpacing={0.6}>
//                       City
//                     </Text>
//                     {`: ${city}
// `}
//                     <Text variant="body_sm_bold" letterSpacing={0.6}>
//                       Street address
//                     </Text>
//                     {`: ${streetAddress}`}
//                   </Text>
//                 ) : (
//                   <Text variant="body_sm">
//                     Please select a delivery address
//                   </Text>
//                 )}
//               </Box>
//             </Box>
//             <Divider />
//             <Box flexDirection="row" alignItems="center" p="s_m">
//               <IconButton
//                 style={{
//                   width: globalUnits.icon_LG,
//                   height: globalUnits.icon_LG,
//                 }}
//                 icon="add"
//                 variant="text"
//                 size="big"
//               />
//               <Text ml="xs" variant="body_sm_bold" color="primary">
//                 Add delivery instructions for your rider
//               </Text>
//             </Box>
//           </Card>
//           <Card variant="primary" mt="l">
//             <Box p="s_m">
//               <Box
//                 flexDirection="row"
//                 alignItems="center"
//                 justifyContent="space-between">
//                 <Box flexDirection="row" alignItems="center">
//                   <Icon
//                     name="wallet"
//                     color={colors.primary}
//                     size={globalUnits.icon_LG}
//                   />

//                   <Text ml="s" variant="body_bold">
//                     Payment method
//                   </Text>
//                 </Box>
//               </Box>
//             </Box>
//             <Box px="s_m" pb="s_m">
//               <RadioButton
//                 title="Cash on delivery"
//                 checked
//                 onCheck={() => {}}
//               />
//             </Box>
//             <Divider />
//             {/* <Box flexDirection="row" alignItems="center" p="s_m">
//               <IconButton
//                 style={{
//                   width: globalUnits.icon_LG,
//                   height: globalUnits.icon_LG,
//                 }}
//                 icon="add"
//                 variant="text"
//                 size="big"
//               />
//               <Text ml="xs" variant="body_sm_bold" color="primary">
//                 Add a payment method
//               </Text>
//             </Box> */}
//           </Card>

//           <Card variant="primary" mt="l">
//             <Box p="s_m">
//               <Box flexDirection="row" alignItems="center">
//                 <Icon
//                   name="receipt"
//                   color={colors.primary}
//                   size={globalUnits.icon_LG}
//                 />

//                 <Text ml="s" variant="body_bold">
//                   Order summary
//                 </Text>
//               </Box>
//               <Box marginVertical="s_m">
//                 {cartItems.map(item => {
//                   const {id, details, quantity} = item || {};
//                   const {name, price} = details?.[0] || {};
//                   return (
//                     <Box
//                       key={id}
//                       flexDirection="row"
//                       alignItems="center"
//                       justifyContent="space-between"
//                       paddingVertical="xs">
//                       <Text variant={'body_sm'}>
//                         {quantity} x {name}
//                       </Text>
//                       <Text variant={'body_sm'}>${price}</Text>
//                     </Box>
//                   );
//                 })}
//               </Box>

//               <Divider />
//               <Box
//                 flexDirection="row"
//                 alignItems="center"
//                 justifyContent="space-between"
//                 mt="s">
//                 <Text variant={'body_sm'}>Subtotal</Text>
//                 <Text variant={'body_sm'}>{totalPrice}$</Text>
//               </Box>
//               <Box
//                 flexDirection="row"
//                 alignItems="center"
//                 justifyContent="space-between"
//                 mt="s">
//                 <Text variant={'body_sm'}>Delivery fee</Text>
//                 <Text variant={'body_sm'}>4.00$</Text>
//               </Box>
//             </Box>
//           </Card>

//           <Text variant="body_sm" mt="l">
//             By completing this order I accept{' '}
//             <Text variant="body_sm_bold" color="primary">
//               Terms and Conditions
//             </Text>
//           </Text>
//         </Box>
//       </Box>
//       <Box flex={1} justifyContent="flex-end" mb="xxs">
//         <Card variant="secondary" py="m" px="m" mb="s">
//           <Box
//             flexDirection="row"
//             justifyContent="space-between"
//             alignItems="center"
//             mx="s">
//             <Text variant="title" color="text">
//               Total{' '}
//               <Text variant="body_sm" color="text">
//                 (inc. VAT)
//               </Text>
//             </Text>
//             <Text variant="title_bold" color="text">
//               ${resultString}
//             </Text>
//           </Box>
//           <RBSheet
//             ref={refRBSheet}
//             closeOnDragDown
//             animationType="fade"
//             customStyles={{
//               wrapper: {
//                 backgroundColor: 'rgba(0,0,0,0.7)',
//               },
//               container: {
//                 borderTopLeftRadius: 35,
//                 borderTopRightRadius: 35,
//               },
//               draggableIcon: {
//                 backgroundColor: colors.gray,
//               },
//             }}>
//             <Box flex={1} p="l">
//               <Box alignItems="center">
//                 <Icon name="person" size={28} color={colors.primary} />
//                 <Text variant="body_sm_bold" mt="m">
//                   You need to login in order to place an order.
//                 </Text>
//               </Box>
//               <Box flexDirection="row" alignItems="center" mt="xl">
//                 {/* <Box flex={1} mr="m">
//                   <CustomButton
//                     label="As a guest"
//                     onPress={() => refRBSheet?.current?.close()}
//                     buttonType="outlined"
//                     buttonSize="full"
//                   />
//                 </Box> */}
//                 <Box flex={1}>
//                   <CustomButton label="Login" onPress={handleSignIn} />
//                 </Box>
//               </Box>
//             </Box>
//           </RBSheet>

//           <CustomButton
//             mt="m"
//             label="Complete Order"
//             backgroundColor="mainBackground"
//             buttonType="outlined"
//             onPress={handleCheckout}
//             loading={status === 'loading'}
//             disabled={status === 'loading'}
//           />
//         </Card>
//       </Box>
