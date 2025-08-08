export default function Home() {
  return (
    <div className="flex justify-center items-center flex-col h-screen">
      <div className="flex justify-around items-center flex-col bg-secondary rounded-2xl h-[30%] w-[30%]">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome to the GitHub Project Creator!
          </h1>
          <p className="text-gray-300 mt-3">
            This is an app to create customized GitHub projects with a single
            click.
          </p>
        </div>

        <button className="bg-green-800 p-4 rounded-sm hover:bg-green-900 cursor-pointer text-xl">
          Login with GitHub
        </button>
      </div>
    </div>
  )
}
