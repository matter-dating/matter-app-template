var dayjs = require('dayjs');
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

export function calculateUserStatus(userData, userInvitation) {
  let status = 0;
  if (userData) {
    status = userData.status;
    if (userInvitation.region === 'waitList') {
      return 7;
    }
    if (userInvitation.region === 'blockList') {
      return 6;
    }
    if (userInvitation.region === 'activeList') {
      status = 0;
    }
    if (userInvitation.region === 'noList') {
      status = 2;
    }
    if (userInvitation.photo_uploaded === false) {
      return 11;
    }
    if (userInvitation.is_valid_photo === 'invalid') {
      return 8;
    }
    if (userInvitation.under_age === true) {
      return 5;
    }
    if (userInvitation.banned === true) {
      return 4;
    }
    if (userInvitation.report_count > 2) {
      return 4;
    }
    if (userInvitation.report_count > userInvitation.seen_report_count) {
      return 3;
    }
    if (userInvitation.hidden === true) {
      return 1;
    }
    return status;
  }
  return status;
}

export function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export function dateToString(date) {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    monthNames[date.getMonth()] +
    ' ' +
    date.getDate() +
    ', ' +
    date.getFullYear()
  );
}

export function cmToInch(cm) {
  if (cm === 90) {
    var inches = (91 * 0.393700787).toFixed(0);
    var feet = Math.floor(inches / 12);
    var inch = (inches %= 12);
    return '< ' + feet + 'ft ' + inch + 'in';
  }
  if (cm === 221) {
    var inches = (220 * 0.393700787).toFixed(0);
    var feet = Math.floor(inches / 12);
    var inch = (inches %= 12);
    return feet + 'ft ' + inch + 'in <';
  }
  var inches = (cm * 0.393700787).toFixed(0);
  var feet = Math.floor(inches / 12);
  var inch = (inches %= 12);
  return feet + 'ft ' + inch + 'in';
}

export function cmToCm(cm) {
  if (cm === 90) {
    return '< 90cm';
  }
  if (cm === 221) {
    return '220 cm <';
  }
  return cm + 'cm';
}
export function ageToAge(age) {
  if (age > 64) {
    return '65+';
  }
  return age;
}
export function mileRender(mile) {
  if (mile > 96) {
    return '100+';
  }
  return mile;
}

export function capitalize(s) {
  if (typeof s !== 'string') {
    return '';
  }
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export const getActiveRouteName = (state) => {
  const route = state.routes[state.index];
  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteName(route.state);
  }
  return route.name;
};

export const getActiveRouteParams = (state) => {
  const route = state.routes[state.index];
  if (route.state) {
    // Dive into nested navigators
    return getActiveRouteParams(route.state);
  }
  return route.params;
};

export function checkRecently(last_active_date, in_hour = 4) {
  const IN_HOUR = in_hour * 60 * 60; /* s */
  return dayjs().unix() - dayjs(last_active_date.$date + 'Z').unix() < IN_HOUR;
}

export function formatTime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  return [h, m > 9 ? m : h ? '0' + m : m || '0', s > 9 ? s : '0' + s]
    .filter(Boolean)
    .join(':');
}

export function formatPhoneNumber(phone) {
  if (phone.startsWith('+976')) {
    var number = phone
      .substring(4)
      .trim()
      .replace(/[^0-9]+/g, '');
    if (number.length === 8) {
      return '+976 ' + number.slice(0, 4) + '-' + number.slice(4);
    } else {
      return phone;
    }
  }
  if (phone.startsWith('+1')) {
    var number = phone
      .substring(2)
      .trim()
      .replace(/[^0-9]+/g, '');
    if (number.length === 10) {
      return (
        '+1 (' +
        number.slice(0, 3) +
        ')' +
        number.slice(3, 6) +
        '-' +
        number.slice(6)
      );
    } else {
      return phone;
    }
  }
  return phone;
}

export function formatPhoneNumberRegister(prefix, phone) {
  if (prefix === '+976') {
    if (phone.startsWith('+976')) {
      var number = phone
        .substring(4)
        .trim()
        .replace(/[^0-9]+/g, '');
      if (number.length === 8) {
        return number.slice(0, 4) + '-' + number.slice(4);
      } else {
        return number;
      }
    } else {
      var number = phone.trim().replace(/[^0-9]+/g, '');
      if (number.length === 8) {
        return number.slice(0, 4) + '-' + number.slice(4);
      } else {
        return number;
      }
    }
  }

  if (prefix === '+1') {
    if (phone.startsWith('+1')) {
      var number = phone
        .substring(2)
        .trim()
        .replace(/[^0-9]+/g, '');
      if (number.length === 10) {
        return (
          '(' +
          number.slice(0, 3) +
          ')' +
          number.slice(3, 6) +
          '-' +
          number.slice(6)
        );
      } else {
        return number;
      }
    } else {
      var number = phone.trim().replace(/[^0-9]+/g, '');
      if (number.length === 10) {
        return (
          '(' +
          number.slice(0, 3) +
          ')' +
          number.slice(3, 6) +
          '-' +
          number.slice(6)
        );
      } else {
        return number;
      }
    }
  }
  return phone;
}

function toRad(Value) {
  return (Value * Math.PI) / 180;
}

export function calcDistance(lat1, lon1, lat2, lon2) {
  var R = 6371; // km
  var dLat = toRad(lat2 - lat1);
  var dLon = toRad(lon2 - lon1);
  var dlat1 = toRad(lat1);
  var dlat2 = toRad(lat2);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(dlat1) * Math.cos(dlat2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d;
}

export function groupBy(collection, property) {
  let group = [];
  for (i = 0; i < collection.length; i = i + 2) {
    var temp = collection.slice(i, i + 2);
    group.push(temp);
  }
  return group;
}

export function sortByName(contacts) {
  // console.log(contacts);
  return contacts.sort((a, b) => a.givenName.localeCompare(b.givenName));
}
