import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/MainLayouts/Home";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/AuthLayouts/Login";
import Register from "../pages/AuthLayouts/Register";
import Blogs from "../pages/MainLayouts/Blogs";
import DashboardLayout from "../layouts/DashboardLayout";
import CreateStudySession from "../pages/DashboardLayouts/Tutors/CreateStudySession";
import StudySession from "../pages/MainLayouts/StudySession";
import ManageUsers from "../pages/DashboardLayouts/Admin/ManageUsers";
import CreateNote from "../pages/DashboardLayouts/Students/CreateNote";
import ManagePersonalNotes from "../pages/DashboardLayouts/Students/ManagePersonalNotes";
import ManageSessions from "../pages/DashboardLayouts/Tutors/ManageSessions";
import StudySessionDetails from "../pages/MainLayouts/StudySessionDetails";
import CreateBlog from "../pages/DashboardLayouts/Admin/CreateBlog";
import ViewBookedSessions from "../pages/DashboardLayouts/Students/ViewBookedSessions";
import ViewAllStudyMaterial from "../pages/DashboardLayouts/Students/ViewAllStudyMaterial";
import UploadMaterials from "../pages/DashboardLayouts/Tutors/UploadMaterials";
import ViewAllMaterials from "../pages/DashboardLayouts/Tutors/ViewAllMaterials";
import PrivateRoute from "../routes/PrivateRoute";
import AdminManageSessions from "../pages/DashboardLayouts/Admin/AdminManageSessions";
import ManageMaterials from "../pages/DashboardLayouts/Admin/ManageMaterials";
import AboutUs from "../pages/MainLayouts/AboutUs";
import Contact from "../pages/MainLayouts/Contact";
import Statistics from "../pages/DashboardLayouts/Statistics";
import BookedSessions from "../pages/DashboardLayouts/Students/BookedSessions";
import TutorRoute from "../routes/TutorRoute";
import AdminRoute from "../routes/AdminRoute";
import Forbidden from "../pages/Forbidden";
import ErrorPage from "../pages/ErrorPage";
import Profile from "../pages/DashboardLayouts/Profile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "about-us",
        Component: AboutUs,
      },
      {
        path: "forbidden",
        Component: Forbidden,
      },
      {
        path: "contact",
        Component: Contact,
      },

      {
        path: "study-session",
        Component: StudySession,
      },
      {
        path: "session-details/:id",
        Component: StudySessionDetails,
      },

      {
        path: "blogs",
        Component: Blogs,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: Statistics,
      },
      {
        path: "create-session",
        element: (
          <TutorRoute>
            <CreateStudySession />
          </TutorRoute>
        ),
      },
      {
        path: "upload-materials",
        element: (
          <TutorRoute>
            <UploadMaterials />
          </TutorRoute>
        ),
      },
      {
        path: "all-materials",
        element: (
          <TutorRoute>
            <ViewAllMaterials />
          </TutorRoute>
        ),
      },
      {
        path: "all-session",
        element: (
          <TutorRoute>
            <ManageSessions />
          </TutorRoute>
        ),
      },
      {
        path: "create-note",
        Component: CreateNote,
      },
      {
        path: "personal-notes",
        Component: ManagePersonalNotes,
      },
      {
        path: "manage-users",
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        ),
      },
      {
        path: "manage-sessions",
        element: (
          <AdminRoute>
            <AdminManageSessions />
          </AdminRoute>
        ),
      },
      {
        path: "manage-materials",
        element: (
          <AdminRoute>
            <ManageMaterials />
          </AdminRoute>
        ),
      },
      {
        path: "create-blog",
        element: (
          <AdminRoute>
            <CreateBlog />
          </AdminRoute>
        ),
      },
      {
        path: "booked-session",
        Component: ViewBookedSessions,
      },
      {
        path: "booked-session/:id",
        Component: BookedSessions,
      },
      {
        path: "study-materials",
        Component: ViewAllStudyMaterial,
      },
      {
        path: "profile",
        Component: Profile,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);
