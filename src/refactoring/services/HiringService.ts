import { REACT_API_URL } from "../../urlConfig";
import AppUtils from "../utils/AppUtils";

class HiringService {
  baseUrl = REACT_API_URL;

  constructor() {
    this.baseUrl = REACT_API_URL;
  }

  // Create operation
  createHiring = () => `${this.baseUrl}/hiring`;
  createInvite = () => `${this.baseUrl}/emailNotifications`;
  // Read operation
  getHirings = () => `${this.baseUrl}/hiring`;

  getResumes = (queryParams: any) =>
    `${this.baseUrl}/fetch-documents?urls=${queryParams}`;


// getMainHiring = (page: number, pageSize: number, filters: any, users: any) => {
//     // Helper function to process names based on a given key ('fname' or 'lname')
//     const processNames = (key: 'fname' | 'lname') => {
//         // Initialize key in updatedFilters as an array if it doesn't exist
//         const updatedArray = filters[key] || [];

//         filters[key]?.forEach((id: string) => {
//             const user = users.find((user: any) => user.profile._id === id);
//             if (user) {
//                 updatedArray.push(user.profile[key === 'fname' ? 'firstName' : 'lastName']);
//             }
//         });

//         // Remove duplicates and invalid entries
//         return Array.from(new Set(updatedArray)).filter(
//             (item) => typeof item === 'string' && !/\d/.test(item)
//         );
//     };

//     // Create a shallow copy of filters to avoid mutating the original
//     const updatedFilters = { ...filters };

//     // Process 'fname' and 'lname' using the helper function
//     updatedFilters.fname = processNames('fname');
//     updatedFilters.lname = processNames('lname');



//     // Prepare the URL with parameters
//     const url = `${this.baseUrl}/hiring`;
//     const params = { page, pageSize, ...updatedFilters };
//     return AppUtils.appendParamsToUrl(url, params);
// };

getMainHiring = (page: number, pageSize: number, filters: any, users: any) => {
    // Helper function to process names based on a given key ('fname' or 'lname')
    const processNames = (key: 'fname' | 'lname') => {
        const updatedArray = filters[key] || [];

        filters[key]?.forEach((id: string) => {
            const user = users.find((user: any) => user._id === id);
            if (user) {
                updatedArray.push(user[key === 'fname' ? 'firstName' : 'lastName']);
            }
        });

        // Remove duplicates and invalid entries
        return Array.from(new Set(updatedArray)).filter(
            (item) => typeof item === 'string' && !/\d/.test(item)
        );
    };

    // Create an empty object to hold the updated filters
    const updatedFilters: any = {};

    // Process 'fname' and 'lname' and add them to updatedFilters if they have values
    const processedFname = processNames('fname');
    const processedLname = processNames('lname');

    if (processedFname.length > 0) {
        updatedFilters.fname = processedFname;
    }

    if (processedLname.length > 0) {
        updatedFilters.lname = processedLname;
    }

    // Loop through all other filters and add them if they are not empty
    Object.keys(filters).forEach((key) => {
        if (key !== 'fname' && key !== 'lname' && filters[key]) {
            updatedFilters[key] = filters[key];
        }
    });


    // Prepare the URL with parameters
    const url = `${this.baseUrl}/hiring`;
    const params = { page, pageSize, ...updatedFilters };
    return AppUtils.appendParamsToUrl(url, params);
};



  getHiringByFilters = (filters: any,users:any) => {
    const updatedFilters=filters
    filters?.name?.forEach((id:string) => {
      const user = users.find((user:any) => user.profile._id === id);
      if (user) {
        updatedFilters.name.push(user?.profile.firstName);
      }
    });

    const url = `${this.baseUrl}/hiring`;
    return AppUtils.appendParamsToUrl(url, updatedFilters);
  };


  getHotlistByProject=(project="_id,firstName,lastName")=> `${this.baseUrl}/hiring?project=${project}`;

  getSelectedHiring = (id: string) => `${this.baseUrl}/hiring/${id}`;
  //update operation
  updateHiring = (id: string) => `${this.baseUrl}/hiring/${id}`;
}

export default HiringService;
