import dayjs from "dayjs";
import moment from "moment";

class AppUtils {
  static capitalizeFirstLetter = (
    value: string | undefined | number | Date
  ): string => {
    if (!value || value === "" || value === null) {
      return "----";
    } else if (typeof value === "string") {
      return value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      return String(value); // Convert other types to string without capitalization
    }
  };

  static appendParamsToUrl(url: string, params: any) {
    const queryParams = [];

    for (const key in params) {
      if (params.hasOwnProperty(key) && params[key]) {
        queryParams.push(
          `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`
        );
      }
    }
    if (queryParams.length > 0) {
      const queryString = queryParams.join("&");
      return url.includes("?")
        ? `${url}&${queryString}`
        : `${url}?${queryString}`;
    }
    return url;
  }

  static dateToUnix = (date: string) => {
    if (!date) return null;
    return dayjs(date).unix();
  };

  static unixToDate = (unixDate: number | undefined, format = "MM-DD-YYYY"): string => {
    if (unixDate === undefined || unixDate === null) {
      return "---"; 
    }
  
    if (String(unixDate).length > 10) {
      return moment(unixDate ).format(format)||moment(unixDate*1000 ).format(format);    
    }

    return moment.unix(unixDate).format(format);
  };

  static formatDate = (date: string, format = "DD MMM") => {
    return moment(date).format(format);
  };

  static localStorageSetItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  static localStorageGetItem = (key: string) => {
    const storedItem = localStorage.getItem(key);

    // Check if the stored item is not "undefined" or null
    if (storedItem === null || storedItem === "undefined") {
      return null;
    }
  
    try {
      return JSON.parse(storedItem);
    } catch (e) {
      console.error(`Error parsing JSON for key "${key}":`, e);
      return null;
    }
  };

  static localStorageRemoveItem = (key: string) => {
    localStorage.removeItem(key);
  };
  
static setSessionData = (key: string, data: any): void => {
  sessionStorage.setItem(key, JSON.stringify(data));
};


static getSessionData = (key: string): any | null => {
  const storedData = sessionStorage.getItem(key);
  return storedData ? JSON.parse(storedData) : null;
};


static clearSessionData = (key: string): void => {
  sessionStorage.removeItem(key);
};

  static formatContactNumber = (params: { value?: string | null }): string => {
    if (!params.value) {
      return "-";
    }
    const valueAsString = String(params.value);

    // If the value already starts with '+', return it as it is
    if (valueAsString.startsWith("+")) {
      return valueAsString;
    }

    // Otherwise, format the phone number
    const countryCode = valueAsString.slice(0, 1);
    const areaCode = valueAsString.slice(1, 4);
    const firstPart = valueAsString.slice(4, 7);
    const secondPart = valueAsString.slice(7, 11);
    const formattedPhoneNumber = `+${countryCode} (${areaCode})-${firstPart}-${secondPart}`;
    return formattedPhoneNumber;
  };

  static formatTimeRange = (params: any) => {
    const timeFormat = "hh:mm A";
    const { start_time, end_time } = params.data;
    const startTime = moment.unix(start_time).format(timeFormat);
    const endTime = moment.unix(end_time).format(timeFormat);
    return `${startTime} - ${endTime}`;
  };
  static formatAddress = (params: any) => {
    if (
      params &&
      params.addressLine1 &&
      params.city &&
      params.state &&
      params.country &&
      params.zipCode
    ) {
      return `${params.addressLine1}, ${params.city}, ${params.state}, ${params.country}, ${params.zipCode}`;
    }
    return "---";
  };

  static valueFormatter = (params: { value?: string | null }): string => {
    if (params.value && params.value.includes("@")) {
      return params.value;
    }
  
    if (typeof params.value === "string") {
      return AppUtils.capitalizeFirstLetter(params.value) || "-";
    } else {
      return params.value || "-";
    }
  };
  static formatDateUnixCompare = (date:any) => {
    if (!date) return null; 
  
 
    const dateString = date.toString();

  
  if (dateString.length > 10) {

    return dayjs.unix(date / 1000); 
  } else {
  
    return dayjs.unix(date);
  }
  
    return null; }
}

export default AppUtils;
