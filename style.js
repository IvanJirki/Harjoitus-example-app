import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    padding: 3,
  },
  title: {
    textAlign: 'center',
    fontSize: 65,
    color: '#fff',
    marginBottom: 1,
    marginTop: 50,
  },
  subTitle: {
    textAlign: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 3.5,
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    marginTop: 10,
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
    backgroundColor: 'white',
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.75,
    shadowRadius: 3.5,
    elevation: 5,
    paddingHorizontal: 15,
    paddingVertical: 1,
  },
  searchIcon: {
    marginRight: 10,
  },
  input: {
    height: 40,
    flex: 1,
    fontSize: 18,
    color: '#333',
    paddingLeft: 15,
    borderRadius: 25,
    backgroundColor: '#f9f9f9',
  },
  addButton: {
    backgroundColor: '#FF4500',
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 0,
    marginLeft: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  // Urheilulajien lista
  exerciseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderRadius: 100,
    borderWidth: 1.5,
    borderColor: '#ddd',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 1.0,
    shadowRadius: 4,
    elevation: 3,
    width: '100%',
  },
  exerciseText: {
    fontSize: 15,
    color: '#333',
    fontWeight: '600',
    flex: 1,
    paddingVertical: 5,
    textAlign: 'center',
  },
  noResultsText: {
    fontSize: 16,
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
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF6347',
    paddingVertical: 10,
    paddingHorizontal: 8,
    marginBottom: 0,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 25,
    elevation: 15,
    minWidth: 90,
    marginRight: 0,
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
    paddingHorizontal: 15,
    paddingVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  flatListContainer: {
    flex: 1,
    width: '100%',
    paddingHorizontal: 5,
    marginTop: 0,
    paddingBottom: 10,
  },

  // **Category Title** tyyli (Muokattu erottumaan paremmin)
  categoryTitle: {
    fontSize: 22, // Suuremman koon teksti
    fontWeight: 'bold',
    color: 'white', // Oranssi väri
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    textAlign: 'left',
  },

  //Uudet tyylit modaalille
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Tummennettu tausta
    paddingHorizontal: 20, // Varmistetaan, ettei sisällön reunoilla ole liikaa tyhjää
  },
  modalContent: {
    width: '90%', // Maksimi leveys
    maxWidth: 400, // Määrätään maksimileveys
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    elevation: 5, // Lisää varjoa Android-laitteille
    shadowColor: '#000', // Lisää varjoa iOS-laitteille
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15, // Lisää tilaa otsikon ja sisällön väliin
    textAlign: 'center', // Keskitetään otsikko
    color: '#333', // Parempi kontrasti
  },
  picker: {
    height: 150, // Korkeuden säätö, jotta valitsimet eivät ole liian pieniä
    width: '100%',
    marginVertical: 20, // Lisää tilaa ylös ja alas
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10, // Lisää tilaa nappien väliin
  },
  modalButton: {
    flex: 1, // Varmistaa, että napit venyvät
    marginHorizontal: 5, // Lisää väliä nappien välille
    paddingVertical: 10, // Lisää tilaa napin sisälle
    borderRadius: 5,
    backgroundColor: '#FF6347', // Esimerkiksi punainen
  },
  modalButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  
});

export default styles;
