import { REACT_API_URL } from "../../urlConfig";
import AppUtils from "../utils/AppUtils";

class UserService {
  baseUrl = REACT_API_URL;

  constructor() {
    this.baseUrl = REACT_API_URL;
  }

  getUserById = (user_id: string) => `${this.baseUrl}/user/${user_id}`;
  // Create operation
  createUser = () => `${this.baseUrl}/user`;

  // Read operation
  getUsers = () => `${this.baseUrl}/user`;

  getUsersByProject = (project = "profile.firstName,profile._id") =>
    `${this.baseUrl}/user?project=${project}`;

  getUsersOnlyByProject = (
    project = "profile._id,profile.firstName,profile.lastName,profile.authRole"
  ) => `${this.baseUrl}/user?project=${project}&onlyUsers=true`;

  getAdminsOnlyByProject = (
    project = "profile._id,profile.firstName,profile.lastName,profile.authRole"
  ) => `${this.baseUrl}/user?project=${project}&onlyAdmins=true`;

  getAdminsSourcingMangagerOnlyByProject = (
    project = "profile._id,profile.firstName,profile.lastName,profile.authRole"
  ) =>
    `${this.baseUrl}/user?project=${project}&onlyAdmins=true&sourceManagers=true`;

  getUser = (id: string) => `${this.baseUrl}/user/${id}`;

  getUsersByFilters = (filter = "") => {
    if (!filter) {
      return `${this.baseUrl}/user`;
    } else {
      return `${this.baseUrl}/user?${filter}=true`;
    }
  };

  getUsersByNameFilters = (filter = "", userNameFilters: any, users: any) => {
    let url = !filter ? `${this.baseUrl}/user` : `${this.baseUrl}/user?${filter}=true`;

    const processNames = (key: 'fname' | 'lname') => {
        // Initialize key in updatedFilters as an array if it doesn't exist
        const updatedArray = userNameFilters[key] || [];

        userNameFilters[key]?.forEach((id: string) => {
            const user = users.find((user: any) => user.profile._id === id);
            if (user) {
                updatedArray.push(user.profile[key === 'fname' ? 'firstName' : 'lastName']);
            }
        });

        // Remove duplicates and invalid entries
        return Array.from(new Set(updatedArray)).filter(
            (item) => typeof item === 'string' && !/\d/.test(item)
        );
    };

    // Create a shallow copy of filters to avoid mutating the original
    const updatedFilters: any = {};

    // Conditionally add 'fname' and 'lname' to updatedFilters if they have values
    const processedFname = processNames('fname');
    const processedLname = processNames('lname');

    if (processedFname.length > 0) {
        updatedFilters.fname = processedFname;
    }

    if (processedLname.length > 0) {
        updatedFilters.lname = processedLname;
    }


    // Append the processed filters to the URL
    return AppUtils.appendParamsToUrl(url, updatedFilters);
};


  // getUsersByNameFilters = (filter = "", userNameFilters: any, users: any) => {
  //   let url = null;

  //   if (!filter) {
  //     url = `${this.baseUrl}/user`;
  //   } else {
  //     url = `${this.baseUrl}/user?${filter}=true`;
  //   }
  //   const processNames = (key: "fname" | "lname") => {
  //     // Initialize key in updatedFilters as an array if it doesn't exist
  //     const updatedArray = userNameFilters[key] || [];

  //     userNameFilters[key]?.forEach((id: string) => {
  //       const user = users.find((user: any) => user.profile._id === id);
  //       if (user) {
  //         updatedArray.push(
  //           user.profile[key === "fname" ? "firstName" : "lastName"]
  //         );
  //       }
  //     });

  //     // Remove duplicates and invalid entries
  //     return Array.from(new Set(updatedArray)).filter(
  //       (item) => typeof item === "string" && !/\d/.test(item)
  //     );
  //   };

  //   // Create a shallow copy of filters to avoid mutating the original
  //   const updatedFilters = { ...userNameFilters };

  //   // Process 'fname' and 'lname' using the helper function
  //   updatedFilters.fname = processNames("fname");
  //   updatedFilters.lname = processNames("lname");
  //   return AppUtils.appendParamsToUrl(url, updatedFilters);
  // };

  // // Update operation
  updateUser = (id: string) => `${this.baseUrl}/user/${id}`;

  // // Delete operation
  // deleteUser = () => `${this.baseUrl}/user`;
}

export default UserService;
