import { REACT_API_URL } from "../../urlConfig";
import AppUtils from "../utils/AppUtils";

class GlossaryService {
  baseUrl = REACT_API_URL;

  constructor() {
    this.baseUrl = REACT_API_URL;
  }

  // Create operation
  createKeyword = () => `${this.baseUrl}/glossaries`;

  // Read operation
  getKeywords = () => `${this.baseUrl}/glossaries`;
  getMainGlossary = (filters: any, page: number, limit: number) => {
    const url = `${this.baseUrl}/glossaries`;
    const params = { ...filters, page, limit };
    return AppUtils.appendParamsToUrl(url, params);
  };
  getSelectedKeyword = (id: string) => `${this.baseUrl}/glossaries/${id}`;

  //Filters Operation
  getTagsGlossary = () => `${this.baseUrl}/filter/glossaries?key=tags`;

  getTechnology = () => `${this.baseUrl}/filter/glossaries?key=technology`;

  getKeywordsGlossary = () => `${this.baseUrl}/filter/glossaries?key=key`;
  // Update operation
  updateKeyword = (id: string) => `${this.baseUrl}/glossaries/${id}`;

  // // Delete operation
  // deleteKeyword = (id:string) => `${this.baseUrl}/glossary/${id}`;
}

export default GlossaryService;
