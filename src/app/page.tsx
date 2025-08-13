import GitHubLoginButton from '@/components/GitHubLoginButton'

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center mb-6">
          Next.js Firebase Auth
        </h1>
        <div className="flex justify-center">
          <GitHubLoginButton />
        </div>
      </div>
    </div>
  )
}
