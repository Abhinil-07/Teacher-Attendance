import Link from "next/link";

export function Landing() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8 dark:bg-gray-950">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Link className="flex items-center justify-center" href="#">
            <CalendarIcon className="h-8 w-8" />
            <span className="ml-2 text-2xl font-bold">Student Attendance</span>
          </Link>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-50">
            Welcome to the Admin side of our Attendance System
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Get started by creating an account.
          </p>
        </div>
        <div className="flex justify-center">
          <Link
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:bg-indigo-400 dark:text-gray-950 dark:hover:bg-indigo-500 dark:focus:ring-indigo-400 dark:focus:ring-offset-gray-950"
            href="/signup"
          >
            Create an Account
          </Link>
        </div>
        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?
          <Link
            className="font-medium text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
            href="/login"
          >
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
}

function CalendarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect width="18" height="18" x="3" y="4" rx="2" />
      <path d="M3 10h18" />
    </svg>
  );
}
