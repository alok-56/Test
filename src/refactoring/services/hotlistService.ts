import { REACT_API_URL } from "../../urlConfig";

class HotListService {
  baseUrl = REACT_API_URL;

  constructor() {
    this.baseUrl = REACT_API_URL;
  }

  // Create operation
  createHotList = () => `${this.baseUrl}/hotlist`;

  // Read operation
  getHotLists = (date: string) => `${this.baseUrl}/hotlist/${date}`;

  getWeeks = () => `${this.baseUrl}/hotlist/weeks`;

  getHotListsByFilters = (filter = "",date: string) => {
    if (!filter) {
      return `${this.baseUrl}/hotlist/${date}`;
    } else {
      return `${this.baseUrl}/hotlist/${date}?priority=${filter}`;
    }
  };


  getHotlistByProject=(project="firstName,lastName")=> `${this.baseUrl}/hotlist?project=${project}`;

  // Update operation
  updateHotList = (date: string) => `${this.baseUrl}/hotlist/${date}`;

  // Delete operation
  async deleteHotList() {
    throw "Not implemented";
  }
}

export default HotListService;
