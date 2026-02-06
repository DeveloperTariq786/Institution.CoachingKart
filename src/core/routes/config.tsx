import { ROUTES } from "./paths";
import Landing from "@/pages/landing/Landing";
import Login from "@/pages/login/Login";
import Onboarding from "@/pages/onboarding/Onboarding";
import Dashboard from "@/pages/dashboard/Dashboard";
import Institution from "@/pages/Institution/Institution";
import Courses from "@/pages/courses/Courses";
import AddCourse from "@/pages/courses/AddCourse";
import Programs from "@/pages/programs/Programs";
import Batches from "@/pages/batches/Batches";
import Centers from "@/pages/centers/Centers";
import Admins from "@/pages/users/Admins";
import AddAdmin from "@/pages/users/AddAdmin";
import Faculty from "@/pages/faculty/Faculty";
import Results from "@/pages/results/Results";
import Students from "@/pages/users/Students";
import AddStudent from "@/pages/users/AddStudent";
import Customization from "@/pages/customization/Customization";
import Media from "@/pages/media/Media";
import NotFound from "@/pages/NotFound";

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
    { path: ROUTES.BATCHES, element: <Batches />, title: "Batches", protected: true },
    { path: ROUTES.CENTERS, element: <Centers />, title: "Centers", protected: true },
    { path: ROUTES.STUDENTS, element: <Students />, title: "Students", protected: true },
    { path: ROUTES.STUDENTS_ADD, element: <AddStudent />, title: "Add Student", protected: true },
    { path: ROUTES.ADMINS, element: <Admins />, title: "Admins", protected: true },
    { path: ROUTES.ADMINS_ADD, element: <AddAdmin />, title: "Add Admin", protected: true },
    { path: ROUTES.FACULTY, element: <Faculty />, title: "Faculty", protected: true },
    { path: ROUTES.RESULTS, element: <Results />, title: "Results", protected: true },
    { path: ROUTES.CUSTOMIZATION, element: <Customization />, title: "Customization", protected: true },
    { path: ROUTES.MEDIA, element: <Media />, title: "Media", protected: true },
    { path: ROUTES.NOT_FOUND, element: <NotFound /> },
];
