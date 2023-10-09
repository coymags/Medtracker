import { create } from 'zustand';

const useStore = create((set) => ({
  // Your initial state here (blank object in this case)
  mapEventLocation: {},
  // Add a setter function to update the state
  setMapEventLocation: (newMapEventLocation) => set({ mapEventLocation: newMapEventLocation}),
  RegisterFormInputField: {
    email: "",
    pharmacy_name: "",
    password: "",
  },
  setRegisterForm: (name, value) =>
    set((state) => ({
      RegisterFormInputField: { ...state.RegisterFormInputField, [name]: value },
    })),
}));

export default useStore;