import { signIn, signOut, useSession } from 'next-auth/react'

export default function Home() {
  const { data: session } = useSession()

  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="flex justify-around items-center flex-col bg-secondary rounded-2xl h-[30%] w-[30%] p-6">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome to the GitHub Project Creator!
          </h1>
          <p className="text-gray-300 mt-3">
            This is an app to create customized GitHub projects with a single
            click.
          </p>
        </div>

        {!session ? (
          <button
            onClick={() => signIn('github')}
            className="bg-green-800 p-4 rounded-sm hover:bg-green-900 cursor-pointer text-xl"
          >
            Login with GitHub
          </button>
        ) : (
          <div className="flex flex-col items-center">
            <p className="text-sm">
              Logged in as {session.user?.name ?? session.user?.email}
            </p>
            <div className="mt-2 flex gap-2">
              <button
                onClick={() => signOut()}
                className="bg-red-600 p-2 rounded-md hover:bg-red-700"
              >
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
