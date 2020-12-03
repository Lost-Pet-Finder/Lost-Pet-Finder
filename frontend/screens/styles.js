import {StyleSheet, Dimensions} from 'react-native';

export default styles = StyleSheet.create({
  //signup and login components
  container: {
    flex: 1,
    backgroundColor: '#BBDEFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputText: {
    height: 50,
    color: '#fff',
    fontSize: 16,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#465881',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  loginText: {
    color: '#fff',
    fontSize: 16,
  },
  signup: {
    color: '#fff',
    marginTop: 15,
  },
  loginButton: {
    width: '40%',
    backgroundColor: '#2196F3',
    borderRadius: 25,
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  image: {
    marginBottom: 40,
    width: 120,
    height: 120,
    resizeMode: 'stretch',
  },

  //home page component
  containerView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#BBDEFB',
  },
  reportView: {
    backgroundColor: '#22577A',
    height: '30%',
    width: '90%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  browseView: {
    backgroundColor: '#2F8789',
    height: '30%',
    width: '90%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactView: {
    backgroundColor: '#2E8B57',
    height: '30%',
    width: '90%',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },

  //report screen component
  report_container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#BBDEFB',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'space-between',
    display: 'flex',
  },
  imageWrapper: {
    flex: 0.25,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapcontainer: {
    width: '90%',
    flex: 0.35,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  detailSection: {
    flex: 0.15,
    width: '90%',
    backgroundColor: '#fff',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  btnContainer: {
    flex: 0.05,
    width: '90%',
    backgroundColor: '#fff',
  },
  move_style: {
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'roboto',
    textAlign: 'center',
  },
  loc_style: {
    fontSize: 10,
    color: '#999',
    textAlign: 'center',
  },
  identity_style: {
    fontSize: 14,
    paddingVertical: 10,
    borderBottomColor: 'silver',
    borderBottomWidth: 0.5,
  },
  buttonWrapper: {
    flex: 0.1,
    flexDirection: 'row',
  },
  SearchButton: {
    alignSelf: 'center',
    padding: 20,
    flex: 0.5,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    height: '5%',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  textStyle: {
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#fff',
    fontSize: 16,
  },
  textInputField: {
    fontSize: 15,
    width: '90%',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
    flex: 0.05,
    textAlign: 'center',
  },
  report_image: {
    width: 130,
    height: 130,
  },

  //browse page component
  browse_container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollView: {
    width: '100%',
  },
  scrollViewCellContainer: {},
  scrollViewCell: {
    backgroundColor: '#BBDEFB',
    margin: 10,
    padding: 15,
    borderRadius: 15,
  },
  titleText: {
    fontSize: 20,
    textAlign: 'left',
  },
  imageView: {
    height: 140,
    width: 140,
    marginBottom: 20,
  },
  imageAndTextContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  textText: {
    fontSize: 13,
    textAlign: 'center',
  },
  rateTitleText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  rateText: {
    fontSize: 15,
    textAlign: 'left',
    marginBottom: 5,
  },
  buttonStyle: {
    // padding: 10,
    // width: 10,
  },

  //contact page component
  contact_container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  viewContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalFlexContainer: {
    width: '100%',
    height: 150,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  colorUnit: {
    alignItems: 'center',
    width: '30%',
  },
  colorBox: {
    backgroundColor: '#000000',
    height: '50%',
    width: '100%',
  },
  colorText: {
    fontSize: 18,
  },

  contact_titleText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  aiTags: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center',
  },
  contactButton: {
    alignSelf: 'center',
    padding: 10,
    backgroundColor: '#2196F3',
    borderRadius: 10,
    justifyContent: 'center',
  },
  detailsView: {
    marginTop: -20,
    width: 200,
  },
});
