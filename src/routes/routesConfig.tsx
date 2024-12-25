import ClientTable from "../refactoring/components/client/ClientTable";
import VendorTable from "../refactoring/components/vendor/VendorTable";
import RecruiterTable from "../refactoring/components/recruiter/RecruiterTable";
import HotListTable from "../refactoring/components/Hotlist/HotlistTable";
import ThinkAI from "../refactoring/components/thinkai/ThinkAI";
import Dashboard from "../refactoring/components/dashboard/Dashboard";
import RecruitmentTable from "../refactoring/components/Recruitment/RecruitmentTable";
import SubmissionTable from "../refactoring/components/submission/Submissions/Submission";
import InterviewQuestionsTable from "../refactoring/components/interviewQuestions/InterviewPreparationTable";
import Analyzer from "../refactoring/components/resumeAnalyzer";
import RecruitmentSubmissionsTable from "../refactoring/components/RecruitmentSubmission/RecruitmentSubmissionTable";
import Glossary from "../refactoring/components/glossary/GlossaryTable";
import Contacts from "../refactoring/components/Resources/Contacts";
import LoginForm from "../refactoring/components/LoginForm/LoginForm";
import InterviewForm from "../components/Interviews/InterviewForm";
import SingleUserForm from "../components/SingleUser/SingleUserForm";
import SubmissionForm from "../components/Submission/SubmissionForm";
import NewInterviewTable from "../refactoring/components/interview/InterviewTable";
import NewUserTable from "../refactoring/components/users/UserTable";
import {  LOGIN_URL } from "../urlConfig";
import InterviewTable from "../components/Interviews/InterviewTable";
import Signup from "../refactoring/components/Signup/Signup";
import HiringTable from "../refactoring/components/Hiring/Hiring";
import AddUser from "../refactoring/components/users/AddUsers";
import UsersTable from "../refactoring/components/users/UserTable";
import TrainingIT from "../refactoring/components/Training/Training";
import Cards from "../refactoring/components/Training/Cards";


// Define routes configuration
export const routesConfig = [
  {/*NEW ROUTES*/},
  { path: LOGIN_URL, element: <LoginForm /> },
  { path: "/register", element: <Signup /> },
  { path: "/v1/hiring-form", element: <Signup /> },
  { path: "/v1/hiring", element: <HiringTable /> },
  { path: "/v1/clients", element: <ClientTable /> },
  { path: "/v1/vendors", element: <VendorTable /> },
  { path: "/v1/recruiters", element: <RecruiterTable /> },
  { path: "/v1/hotlist", element: <HotListTable /> },
  { path: "/v1/submissions", element: <SubmissionTable /> },
  { path: "/v1/interview", element: <InterviewTable /> },
  //{ path: "/v1/users", element: <UserTable /> },
  { path: "/v1/thinkai", element: <ThinkAI /> },
  { path: "/v1/dashboard", element: <Dashboard /> },
  { path: "/v1/recruitment", element: <RecruitmentTable /> },
  { path: "/v1/recruitment/submission", element: <RecruitmentSubmissionsTable /> },
  { path: "/v1/interview_preparation", element: <InterviewQuestionsTable /> },
  { path: "/v1/resume_analyzer", element: <Analyzer /> },
  { path: "/v1/it_terminology", element: <Glossary /> },
  { path: "/v1/contacts", element: <Contacts /> },
  { path: "/v1/user-form", element: <AddUser /> },
  { path: "/v1/update-user-form", element: <AddUser /> },
  { path: "/v1/users", element: <UsersTable /> },
  { path: "/v1/training", element: <TrainingIT /> },
  { path: "/v1/training/:id", element: <Cards /> },

  {/*OLD ROUTES*/},
  // { path: "/user-form", element: <UserForm /> },
  // { path: "/update-user-form", element: <UserForm /> },
  { path: "/update-singleuser-form", element: <SingleUserForm /> },
  { path: "/submission-form", element: <SubmissionForm /> },
  { path: "/update-submission-form", element: <SubmissionForm /> },
  { path: "/update-interview", element: <InterviewForm /> },
  { path: "/v2/interviews", element: <NewInterviewTable /> },
  { path: "/v2/users", element: <NewUserTable /> },

];
