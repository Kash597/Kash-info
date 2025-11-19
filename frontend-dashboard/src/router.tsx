import { createRootRoute, createRoute, createRouter, Link, Outlet } from '@tanstack/react-router'
import { Dashboard } from './pages/Dashboard'
import { Profile } from './pages/Profile'
import { Resources } from './pages/Resources'
import { OmniBot } from './pages/OmniBot'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Button } from './components/ui/button'
import { ProtectedRoute } from './components/ProtectedRoute'
import { useAuthStore } from './stores/auth'

// Root layout component
function RootLayout() {
  return (
    <div className="min-h-screen bg-background">
      <Outlet />
    </div>
  )
}

// Authenticated layout with navigation
function AuthenticatedLayout() {
  const { user, logout } = useAuthStore()

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <nav className="border-b">
          <div className="container mx-auto flex items-center justify-between p-4">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-bold">KASH_INFO</h1>
              <div className="flex space-x-2">
                <Link to="/">
                  <Button variant="ghost" size="sm">Dashboard</Button>
                </Link>
                <Link to="/omnibot">
                  <Button variant="ghost" size="sm">OmniBot</Button>
                </Link>
                <Link to="/resources">
                  <Button variant="ghost" size="sm">Resources</Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">Profile</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">{user?.email}</span>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </nav>

        <Outlet />
      </div>
    </ProtectedRoute>
  )
}

// Define routes
const rootRoute = createRootRoute({
  component: RootLayout,
})

// Auth routes (public)
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  component: Login,
})

const signupRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/signup',
  component: Signup,
})

// Authenticated routes parent
const authenticatedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'authenticated',
  component: AuthenticatedLayout,
})

// Authenticated child routes
const dashboardRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/',
  component: Dashboard,
})

const omnibotRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/omnibot',
  component: OmniBot,
})

const resourcesRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/resources',
  component: Resources,
})

const profileRoute = createRoute({
  getParentRoute: () => authenticatedRoute,
  path: '/profile',
  component: Profile,
})

// Create route tree
const routeTree = rootRoute.addChildren([
  loginRoute,
  signupRoute,
  authenticatedRoute.addChildren([
    dashboardRoute,
    omnibotRoute,
    resourcesRoute,
    profileRoute,
  ]),
])

// Create and export router
export const router = createRouter({ routeTree })

// Register router for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
