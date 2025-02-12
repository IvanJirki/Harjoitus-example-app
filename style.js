import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  // Main container
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 10,
    backgroundColor: '#f7f7f7',
  },
  // Title style
  title: {
    textAlign: 'center',
    fontSize: 55,
    color: '#fff',
    marginBottom: 15,
    marginTop: 50,
    fontWeight: 'bold',
  },
  subTitle: {
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 3.5,
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
    marginTop: 10,
    marginBottom: 15,
  },
  // Search input container
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 3.5,
    elevation: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  searchIcon: {
    marginRight: 15,
  },
  input: {
    height: 45,
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingLeft: 15,
    borderRadius: 25,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    backgroundColor: '#FF4500',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginLeft: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Exercise item
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#ddd',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 4,
    elevation: 4,
    width: '100%',
  },
  exerciseText: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
    flex: 1,
    paddingVertical: 5,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginTop: 20,
    fontWeight: '600',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 6,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6347',
    paddingVertical: 12,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 15,
    minWidth: 100,
  },
  iconButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  activeButton: {
    backgroundColor: '#FF4500',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  flatListContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 10,
    marginTop: 0,
    paddingBottom: 15,
  },

  // Category Title Style
  categoryTitle: {
    fontSize: 24, // Larger font size
    fontWeight: 'bold',
    color: '#FF6347', // Orange color
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginTop: 15,
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    textAlign: 'left',
  },

  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Darker overlay for contrast
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 12,
  },
  modalTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF4500',
  },
  modalLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 15,
    color: '#333',
  },
  pickerContainer: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    paddingVertical: 8,
    marginVertical: 10,
  },
  picker: {
    color: '#333',
    fontSize: 16,
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF4500',
    padding: 14,
    borderRadius: 12,
    marginVertical: 15,
    width: '100%',
    justifyContent: 'center',
  },
  dateText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 12,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 25,
  },
  previousButton: {
    backgroundColor: '#ccc',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  nextButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  saveButton: {
    backgroundColor: '#32CD32',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },

  // Additional Style for Input Error
  inputError: {
    borderColor: '#FF4500',
    borderWidth: 1.5,
    marginBottom: 10,
  },

  // Floating action button style
  genderButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  selectedButton: {
    backgroundColor: '#FF6347',
  },
  buttonText: {
    color: '#FF6347',
    fontSize: 16,
  },
  goalButton: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
    color: '#FFF',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 5,
  },
});

export default styles;
