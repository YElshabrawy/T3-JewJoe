import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import { trpc as api } from "../../utils/trpc";
import { TRPCError } from "@trpc/server";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [errMsg, setErrMsg] = useState("");

  // const hello = api.example.hello.useQuery({ text: "from tRPC" });
  const createUserMutation = api.user.createUser.useMutation({
    onError: (e) => setErrMsg(e.message),
    onSuccess: () => router.push("/auth/login"),
  });

  // Formik
  interface MyFormValues {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  }
  const initialValues: MyFormValues = {
    email: "",
    password: "",
    username: "",
    confirmPassword: "",
  };

  async function handleSubmitRegister(values: MyFormValues) {
    // console.log("vals", values);
    // Check if pw match
    if (values.password !== values.confirmPassword) {
      // Throw an error
      const msg = "Passwords Does not Match";
      setErrMsg(msg);
      throw new Error(msg);
    }
    await createUserMutation.mutateAsync({
      email: values.email,
      name: values.username,
      password: values.password,
    });
    // console.log("user", u);
    // if (!u) {
    //   const msg = "Internal Server Error";
    //   setErrMsg(msg);
    //   throw new Error(msg);
    // }
    // void router.push("/auth/login");
  }
  return (
    <>
      <main className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
        <div className=" p-6 sm:p-8 ">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-2xl">
            JoeDev - Register
          </h1>
          {errMsg && (
            <div
              className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700 dark:bg-gray-800 dark:text-red-400"
              role="alert"
            >
              <span className="font-medium">Error!</span> {errMsg}
            </div>
          )}
          <Formik initialValues={initialValues} onSubmit={handleSubmitRegister}>
            <Form className="space-y-4 md:space-y-4">
              <label className="my-label" htmlFor="username">
                Full Name
              </label>
              <Field
                id="username"
                name="username"
                type="text"
                placeholder="username"
                className="focus:border-primary-600 focus:ring-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              />
              <label className="my-label" htmlFor="email">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="test@test.com"
                className="focus:border-primary-600 focus:ring-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              />

              <label className="my-label" htmlFor="password">
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Enter Password"
                className="focus:border-primary-600 focus:ring-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              />
              <label className="my-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="focus:border-primary-600 focus:ring-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
              />
              <button
                type="submit"
                className="bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4"
              >
                Register
              </button>
            </Form>
          </Formik>
        </div>
      </main>
    </>
  );
}
