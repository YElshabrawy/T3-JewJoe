// import Head from "next/head";
import { useRouter } from "next/router";
import {
  // useFormik,
  Formik,
  // FormikHelpers,
  // FormikProps,
  Form,
  Field,
  // FieldProps,
} from "formik";

import Link from "next/link";
import { signIn } from "next-auth/react";

export default function Login() {
  const router = useRouter();
  const errMsg = router.query.error;

  // Formik
  interface MyFormValues {
    email: string;
    password: string;
  }
  const initialValues: MyFormValues = { email: "", password: "" };

  async function handleSubmitLogin(values: MyFormValues) {
    await signIn("credentials", {
      ...values,
      callbackUrl: (router.query.callbackUrl as string) ?? "/",
    });
  }
  return (
    <>
      <main className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            JoeDev - Login
          </h1>
          {errMsg && (
            <h3 className="font-bold text-red-400">
              Error:{" "}
              {errMsg == "CredentialsSignin"
                ? "Check Email or password"
                : errMsg}
            </h3>
          )}
          <Formik initialValues={initialValues} onSubmit={handleSubmitLogin}>
            <Form className="space-y-4 md:space-y-6">
              <label className="my-label" htmlFor="email">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="test@test.com"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              />

              <label className="my-label" htmlFor="password">
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder=""
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary-600 focus:ring-primary-600 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-primary-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  href="/auth/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
              <button
                type="button"
                onClick={() =>
                  void signIn("google", {
                    callbackUrl: (router.query.callbackUrl as string) ?? "/",
                  })
                }
                className="mt-10 flex w-full items-center rounded-lg border border-gray-700 bg-white py-3.5 px-4 hover:bg-slate-200 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-1"
              >
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z"
                    fill="#4285F4"
                  ></path>
                  <path
                    d="M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z"
                    fill="#34A853"
                  ></path>
                  <path
                    d="M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z"
                    fill="#FBBC05"
                  ></path>
                  <path
                    d="M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z"
                    fill="#EB4335"
                  ></path>
                </svg>
                <p className="ml-4 text-base font-medium text-gray-700">
                  Continue with Google
                </p>
              </button>
            </Form>
          </Formik>
        </div>
      </main>
    </>
  );
}
