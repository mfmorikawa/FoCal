import { useAuth0 } from "@auth0/auth0-react";

export default function Landing() {
  const { loginWithRedirect } = useAuth0();  
  return (
    <>
      <main className="mt-10 mx-auto mb-10 max-w-7xl px-4 sm:mb-12 sm:px-6 md:mb-16 lg:mb-20 lg:px-8 xl:mb-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">FoCal</span>
              <hr />
              <span className="inline-block text-indigo-600 xl:inline">
                Focus, schedule,
                <br />
                and manage tasks
              </span>
            </h1>
            <p className="mt-3 text-base text-gray-500 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
              Focal seeks to act as a personal assistant, with a schedule 
              calendar that integratres with a pomodoro focus timer for
              deep and meaningful work, the ability to divide and conquer
              more long term goals using projects, and allowing users to 
              customize focus settings to maximize productivity!
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <button 
                className="rounded-md shadow flex items-center justify-center border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 md:py-4 md:px-10 md:text-lg"
                onClick={() => loginWithRedirect()}
              >
                  Get Started
              </button>
            </div>
          </div>
        </main>
        <img
          className="mt-7 h-full w-full sm:h-72 md:h-96 lg:h-full lg:w-full"
          src="https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2850&q=80"
          alt=""
        />
    </>
  );
}
