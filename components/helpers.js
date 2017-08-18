import { StyleSheet } from 'react-native';

export const emailValidation = (email) => {
  // Handle email validation by regex: http://emailregex.com/
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

// Passwords must be longer than 4 letters
export const passwordValidation = pass => pass.length > 4;

export const helperStyles = StyleSheet.create({
  errorText: {
    fontSize: 12,
    color: 'red',
  },
  iOSInput: { // iOS
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    marginVertical: 8,
  },
});
