import { ROUTES } from "./paths";
import Landing from "@/pages/landing/Landing";
import Login from "@/pages/login/Login";
import Onboarding from "@/pages/onboarding/Onboarding";
import Dashboard from "@/pages/dashboard/Dashboard";
import Institution from "@/pages/Institution/Institution";
import Courses from "@/pages/courses/Courses";
import AddCourse from "@/pages/courses/AddCourse";
import Programs from "@/pages/programs/Programs";
import AddProgram from "@/pages/programs/AddProgram";
import Batches from "@/pages/batches/Batches";
import Subjects from "@/pages/subjects/Subjects";
import AddSubject from "@/pages/subjects/AddSubject";
import AddBatch from "@/pages/batches/AddBatch";
import Centers from "@/pages/centers/Centers";
import AddCenter from "@/pages/centers/AddCenter";
import Admins from "@/pages/users/Admins";
import AddAdmin from "@/pages/users/AddAdmin";
import Faculty from "@/pages/faculty/Faculty";
import AddFaculty from "@/pages/faculty/AddFaculty";
// import AddLecture from "@/pages/lectures/AddLecture";
import Results from "@/pages/results/Results";
import AddResult from "@/pages/results/AddResult";
import Students from "@/pages/users/Students";
import AddStudent from "@/pages/users/AddStudent";
import Customization from "@/pages/customization/Customization";
import Media from "@/pages/media/Media";
import AddGallery from "@/pages/media/AddGallery";
import AddBanner from "@/pages/media/AddBanner";
import NotFound from "@/pages/NotFound";
import Lectures from "@/pages/lectures/Lectures";
import AddLecture from "@/pages/lectures/AddLecture";
import LectureResources from "@/pages/resources/LectureResources";
import AddResource from "@/pages/resources/AddResource";

export interface RouteConfig {
    path: string;
    element: JSX.Element;
    title?: string;
    protected?: boolean;
}

export const APP_ROUTES: RouteConfig[] = [
    { path: ROUTES.LANDING, element: <Landing />, title: "Landing" },
    { path: ROUTES.LOGIN, element: <Login />, title: "Login" },
    { path: ROUTES.ONBOARDING, element: <Onboarding />, title: "Onboarding" },
    { path: ROUTES.DASHBOARD, element: <Dashboard />, title: "Dashboard", protected: true },
    { path: ROUTES.INSTITUTION, element: <Institution />, title: "Institution", protected: true },
    { path: ROUTES.COURSES, element: <Courses />, title: "Courses", protected: true },
    { path: ROUTES.COURSES_ADD, element: <AddCourse />, title: "Add Course", protected: true },
    { path: ROUTES.PROGRAMS, element: <Programs />, title: "Programs", protected: true },
    { path: ROUTES.PROGRAMS_ADD, element: <AddProgram />, title: "Add Program", protected: true },
    { path: ROUTES.BATCHES, element: <Batches />, title: "Batches", protected: true },
    { path: ROUTES.BATCHES_ADD, element: <AddBatch />, title: "Add Batch", protected: true },
    { path: ROUTES.BATCH_LECTURES, element: <Lectures />, title: "Batch Lectures", protected: true },
    { path: ROUTES.SUBJECTS, element: <Subjects />, title: "Subjects", protected: true },
    { path: ROUTES.SUBJECTS_ADD, element: <AddSubject />, title: "Add Subject", protected: true },
    { path: ROUTES.STUDENTS, element: <Students />, title: "Students", protected: true },
    { path: ROUTES.STUDENTS_ADD, element: <AddStudent />, title: "Add Student", protected: true },
    { path: ROUTES.ADMINS, element: <Admins />, title: "Admins", protected: true },
    { path: ROUTES.ADMINS_ADD, element: <AddAdmin />, title: "Add Admin", protected: true },
    { path: ROUTES.FACULTY, element: <Faculty />, title: "Faculty", protected: true },
    { path: ROUTES.FACULTY_ADD, element: <AddFaculty />, title: "Add Faculty", protected: true },
    { path: ROUTES.LECTURES, element: <Lectures />, title: "Lectures", protected: true },
    { path: ROUTES.LECTURES_ADD, element: <AddLecture />, title: "Add Lecture", protected: true },
    { path: ROUTES.CENTERS, element: <Centers />, title: "Centers", protected: true },
    { path: ROUTES.CENTERS_ADD, element: <AddCenter />, title: "Add Center", protected: true },
    { path: ROUTES.RESULTS, element: <Results />, title: "Results", protected: true },
    { path: ROUTES.RESULTS_ADD, element: <AddResult />, title: "Add Result", protected: true },
    { path: ROUTES.CUSTOMIZATION, element: <Customization />, title: "Customization", protected: true },
    { path: ROUTES.MEDIA, element: <Media />, title: "Media", protected: true },
    { path: ROUTES.MEDIA_GALLERY_ADD, element: <AddGallery />, title: "Add Gallery", protected: true },
    { path: ROUTES.MEDIA_BANNER_ADD, element: <AddBanner />, title: "Add Banner", protected: true },
    { path: ROUTES.LECTURE_RESOURCES, element: <LectureResources />, title: "Lecture Resources", protected: true },
    { path: ROUTES.LECTURE_RESOURCES_ADD, element: <AddResource />, title: "Add Resources", protected: true },
    { path: ROUTES.NOT_FOUND, element: <NotFound /> },
];
