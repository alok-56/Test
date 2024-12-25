import AppConstants from "../components/shared/constants";
import AppUtils from "./AppUtils";

class CustomCellRenderer {

  static getRandomColor = () => {
    const colors=AppConstants.colors 
    const colorLen=colors.length
    return colors[Math.floor(Math.random() * colorLen)];
  };
  static renderPriority = (value: string) => {
    const priorityColorMap = [
      { value: "P1", color: "red" },
      { value: "P2", color: "orange" },
      { value: "P3", color: "green" },
      { value: "H1BT", color: "cyan" },
      { value: "High", color: "red" },
      { value: "Medium", color: "orange" },
      { value: "Low", color: "green" },
      { value: "high", color: "red" },
      { value: "medium", color: "orange" },
      { value: "low", color: "green" },
    ];

    let color = "";

    const priorityItem = priorityColorMap.find((item) => item.value === value);
    if (priorityItem) {
      color = priorityItem.color;
    }
    const capitalizedValue = AppUtils.capitalizeFirstLetter(value);
    return { color, capitalizedValue };
  };

  static renderDifficultyLevel = (value: string) => {
    const difficultyColorMap = [
      { value: "Easy", color: "green" },
      { value: "Medium", color: "orange" },
      { value: "Hard", color: "red" },
    ];

    let color = "";

    const difficultyItem = difficultyColorMap.find(
      (item) => item.value === value
    );
    if (difficultyItem) {
      color = difficultyItem.color;
    }
    const capitalizedValue = AppUtils.capitalizeFirstLetter(value);
    return { color, capitalizedValue };
  };

  static renderDateOfBirth = (value: any) => {
    const currentDate = new Date();
    const dob = new Date(value);
    const age = currentDate.getFullYear() - dob.getFullYear();
    const year = dob.getFullYear();
    let color = age >= 25 ? "green" : "red";
    return { color, year };
  };

  static renderWAAuth = (value: any) => {
    if (!value || value === "----") {
      return { color: "", capitalizedValue: "" };
    }

    const authTypes = [
      { type: "cpt", color: "magenta" },
      { type: "opt n", color: "orange" },
      { type: "opt e", color: "red" },
      { type: "h1b t", color: "volcano" },
      { type: "h1b", color: "purple" },
      { type: "h4", color: "gold" },
      { type: "gc", color: "lime" },
      { type: "CPT", color: "magenta" },
      { type: "OPT N", color: "orange" },
      { type: "OPT E", color: "red" },
      { type: "HTB T", color: "volcano" },
      { type: "H1B", color: "purple" },
      { type: "H4", color: "gold" },
      { type: "GC", color: "lime" },
    ];

    let color = "";
    const authType = authTypes.find((auth) => auth.type === value);
    if (authType) {
      color = authType.color;
    }
    const capitalizeAllLetters = value.toUpperCase();
    return { color, capitalizeAllLetters };
  };

  static renderRecruiterType = (value: any) => {
    const recruiterTypes = [
      { type: "vendor", color: "magenta" },
      { type: "client", color: "orange" },
    ];

    let color = "";
    const recruiterType = recruiterTypes.find((type) => type.type === value);
    if (recruiterType) {
      color = recruiterType.color;
    }
    const capitalizedValue = AppUtils.capitalizeFirstLetter(value);
    return { color, capitalizedValue };
  };

  static renderCompanyName = (value: any) => {
    if (!value || value === "----") {
      return { capitalizedValue: "" };
    }


    const randomColor = CustomCellRenderer.getRandomColor();
    const capitalizedValue = AppUtils.capitalizeFirstLetter(value);
    return { color: randomColor, capitalizedValue };
  };

  static renderStatusInterview = (value: any) => {
    const statusColorArray = [
      { status: "Comments", color: "magenta" },
      { status: "Direct Client Interview", color: "orange" },
      { status: "Implementer Interview", color: "geekblue" },
      { status: "Position Confirmed", color: "green" },
      { status: "First Round", color: "gold" },
      { status: "No Response", color: "purple" },
      { status: "Vendor Technical Screening", color: "blue" },
      { status: "Interview Scheduled", color: "volcano" },
      { status: "Written Test", color: "cyan" },
      { status: "Rejected", color: "red" },
      { status: "Coding Test", color: "geekblue" },
      { status: "Applied", color: "volcano" },
      { status: "applied", color: "volcano" },
    ];

    const capitalizedValue = AppUtils.capitalizeFirstLetter(value);
    const statusItem = statusColorArray.find(
      (item) => item.status === capitalizedValue
    );
    const color = statusItem ? statusItem.color : "";
    return { color, capitalizedValue };
  };

  static renderRecruitmentStatus = (value: any) => {
    const recruitmentStatus = [
      { value: "Open", color: "green" },
      { value: "Closed", color: "red" },
      { value: "Hold", color: "orange" },
      { value: "Not Filled", color: "red" },
    ];
    const capitalizedValue = AppUtils.capitalizeFirstLetter(value);
    const statusItem = recruitmentStatus.find(
      (item) => item.value === capitalizedValue
    );
    const color = statusItem ? statusItem.color : "";
    return { color, capitalizedValue };
  };

  static reviewStatus = (value: any) => {
    const recruitmentStatus = [
      { value: "Yet to Review", color: "orange" },
      { value: "On Hold", color: "red" },
      { value: "Added To Portal", color: "green" },
    ];
    const capitalizedValue = AppUtils.capitalizeFirstLetter(value);
    const statusItem = recruitmentStatus.find(
      (item) => item.value === capitalizedValue
    );
    const color = statusItem ? statusItem.color : "";
    return { color, capitalizedValue };
  };

  static renderRecruitmentSubmissionStatus = (value: any) => {
    const recruitmentSubmissionStatus = [
      { value: "Sourcing", label: "Sourcing",color: "purple" },
      { value: "Submitted", label: "Submitted",color: "green" },
      { value: "Interview Requested", label: "Interview Requested",color: "gold" },
      { value: "Position Offered", label: "Position Offered",color: "orange" },
      { value: "Database", label: "Database",color: "magenta" },
    ];
    const capitalizedValue = AppUtils.capitalizeFirstLetter(value);
    const statusItem = recruitmentSubmissionStatus.find(
      (item) => item.value === capitalizedValue
    );
    const color = statusItem ? statusItem.color : "";
    return { color, capitalizedValue };
  };
  
  static renderTechnology = (value: any) => {
    if (!value || value === "----") {
      return [];
    }
  

  
    // Convert comma-separated string to array if necessary
    if (typeof value === "string") {
      value = value.split(',').map(item => item.trim());
    }

    if (Array.isArray(value)) {
      return value.map(item => {
        
        const randomColor = CustomCellRenderer.getRandomColor()
        const capitalizedValue = AppUtils.capitalizeFirstLetter(item);
        return { color: randomColor, capitalizedValue };
      });
    } else {
      const randomColor = CustomCellRenderer.getRandomColor();
      const capitalizedValue = AppUtils.capitalizeFirstLetter(value);
      return [{ color: randomColor, capitalizedValue }];
    }
  };
  
  
}
 
export default CustomCellRenderer;
