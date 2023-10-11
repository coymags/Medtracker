import { create } from 'zustand';

const useStore = create((set) => ({
  // Your initial state here (blank object in this case)
  mapEventLocation: {},
  // Add a setter function to update the state
  setMapEventLocation: (newMapEventLocation) => set({ mapEventLocation: newMapEventLocation}),

  //Register form data
  RegisterFormInputField: {
    email: "",
    pharmacy_name: "",
    password: "",
  },
  setRegisterForm: (name, value) =>
    set((state) => ({
      RegisterFormInputField: { ...state.RegisterFormInputField, [name]: value },
    })),

  //Pharmacy Location Data, Latitude and Longitude
  locationData: {},
  setLocationData: (newLocationData) => set({locationData: newLocationData}),

  //User location Data, User Current Location
  userLocation: {},
  setUserLocation: (newUserLocation) => set({userLocation: newUserLocation}),

  //User type Login from
  userTypeFormInputField: {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  },
  setUserTypeFormInputField: (name, value) =>
    set((state) => ({
      userTypeFormInputField: { ...state.userTypeFormInputField, [name]: value},
    })),
}));

export default useStore;