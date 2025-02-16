import { StyleSheet } from 'react-native';
const styles = ({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 20, // Puolipiste rivin lopussa
    backgroundColor: '#f7f7f7', // Puolipiste rivin lopussa
  },
  title: {
    textAlign: 'center',
    fontSize: 60, // Puolipiste rivin lopussa
    color: '#FFFF',
    marginBottom: 20,
    marginTop: 50,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowOpacity: 0.5,
    textShadowRadius: 8, // Puolipiste rivin lopussa
  },
  subTitle: {
    textAlign: 'left',
    fontSize: 22,
    fontWeight: '600',
    color: '#FF6347',  // Accent color for better visibility
    marginBottom: 15,
    textShadowColor: '#000',
    textShadowOffset: { width: 0, height: 1 },
    textShadowOpacity: 0.75,
    textShadowRadius: 3.5,
  },

  // Input fields
  inputContainer: {
    width: '100%',
    paddingTop: 20,
    alignItems: 'stretch',
    marginBottom: 15,
  },
  input: {
    height: 45,  // Slightly taller input fields
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    fontSize: 18,
    color: '#333',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,  // Added subtle elevation for a modern look
  },
  inputError: {
    borderColor: '#FF4500',
    borderWidth: 1.5,
    marginBottom: 10,
  },

  // Search Container
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 30,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },

  // Gender Selection
  label: {
    fontSize: 18, // Adjusted for consistency
    marginVertical: 12,
    color: '#FFF',
  },
  genderButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  genderButton: {
    backgroundColor: '#FF4500',
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  selectedGenderButton: {
    backgroundColor: '#FF6347',
  },
  genderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  // Buttons
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,  // More space around buttons
    paddingHorizontal: 10,
  },
  wideButton: {
    backgroundColor: '#FF4500',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 35,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  saveButton: {
    backgroundColor: '#FF6347',
    borderRadius: 50,
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: 250,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 120,  // Increased spacing
    marginLeft: 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 15,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 20,  // Larger font for prominence
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#FF4500',
    borderRadius: 25,
    paddingHorizontal: 25,
    paddingVertical: 12,
    marginLeft: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Exercise items
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 25,
    backgroundColor: '#fff',
    borderRadius: 30,
    marginBottom: 12,  // Slightly more space between items
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 2,
    elevation: 5,
    width: '100%',
  },
  exerciseText: {
    fontSize: 20,
    color: '#333',
    fontWeight: '600',
    flex: 1,
    paddingVertical: 5,
    textAlign: 'center',
  },

  // Category Title
  categoryTitle: {
    fontSize: 26,  // Larger size for category headers
    fontWeight: 'bold',
    color: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 25,
    marginTop: 20,
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowOpacity: 0.5,
    textShadowRadius: 5,
    textAlign: 'left',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 35,
    borderRadius: 20,
    alignItems: 'center',
    elevation: 12,
  },
  modalTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FF4500',
  },
  modalLabel: {
    fontSize: 20,
    fontWeight: '600',
    marginVertical: 20,
    color: '#333',
  },

  // Calendar styling
  calendarContainer: {
    flex: 1,
    padding: 20,
  },
  listItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 20,
    marginBottom: 12,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sportText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  removeButton: {
    flexDirection: 'row',
    backgroundColor: '#FF4C4C',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 60,
    elevation: 15,
  },
  noDataText: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },

  // Training Goal Styles (New Styles)
  goalButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  goalButton: {
    backgroundColor: '#FF4500',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    margin: 8,
    alignItems: 'center',
    justifyContent: 'center',
    width: '45%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
  },
  selectedGoalButton: {
    backgroundColor: '#FF6347',
    borderWidth: 2,
    borderColor: '#FFF',
  },
  goalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  selectedGoalButtonText: {
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default styles;
