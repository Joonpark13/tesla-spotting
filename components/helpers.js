import { StyleSheet } from 'react-native';

export const emailValidation = (email) => {
  // Handle email validation by regex: http://emailregex.com/
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

// Passwords must be longer than 4 letters
export const passwordValidation = pass => pass.length > 4;

export const colors = {
  teslaRed: '#cc0000',
};

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
  header: {
    backgroundColor: colors.teslaRed,
  },
  headerTitle: {
    color: 'white',
  },
});

export const parseDate = (dateNum) => {
  const date = new Date(dateNum);
  // If date is before this calendar year, display Month Date, Year
  if (date.getFullYear() < (new Date()).getFullYear()) {
    const formattedDate = date.toDateString(); // Format is "DoW Month Date Year"
    const dateArray = formattedDate.split(' '); // ["DoW", "Month", "Date", "Year"]
    dateArray.shift(); // ["Month", "Date", "Year"]
    return `${dateArray[0]} ${dateArray[1]}, ${dateArray[2]}`; // "Month Date, Year"
  }
  // If date is during this calendar year, display Month Date, Hour:Min
  const formattedDateTime = date.toString(); // Format: Mon Sep 28 1998 14:36:22 GMT-0700 (PDT)
  const dateTimeArray = formattedDateTime.split(' '); // ["Mon", "Sep", "28", "1998", "14:36:22", "GMT-0700" "(PDT)"]
  return `${dateTimeArray[1]} ${dateTimeArray[2]}, ${dateTimeArray[4].substring(0, 5)}`;
};
