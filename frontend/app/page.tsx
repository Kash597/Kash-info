export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-4">
          KASH_INFO
        </h1>
        <p className="text-center text-lg mb-8">
          Elite Membership Platform with AI-Powered Tools
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Status</h2>
            <p className="text-green-600">✅ Frontend Running</p>
            <p className="text-sm text-gray-600 mt-2">
              Next.js 14 with TypeScript and Tailwind CSS
            </p>
          </div>

          <div className="p-6 border rounded-lg">
            <h2 className="text-xl font-semibold mb-2">Backend API</h2>
            <p className="text-sm text-gray-600">
              FastAPI running at <code className="bg-gray-100 px-2 py-1 rounded">http://localhost:8000</code>
            </p>
            <a
              href="http://localhost:8000/docs"
              target="_blank"
              className="text-blue-600 hover:underline text-sm mt-2 inline-block"
            >
              → View API Documentation
            </a>
          </div>
        </div>

        <div className="mt-8 p-6 border rounded-lg bg-blue-50">
          <h2 className="text-xl font-semibold mb-2">Next Steps</h2>
          <ol className="list-decimal list-inside space-y-2">
            <li>Start backend: <code className="bg-white px-2 py-1 rounded text-sm">cd backend && uvicorn app.main:app --reload</code></li>
            <li>Check database connection</li>
            <li>Run Alembic migrations</li>
            <li>Start implementing features</li>
          </ol>
        </div>
      </div>
    </main>
  )
}
