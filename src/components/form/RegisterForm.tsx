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
    onSuccess: () => router.push("/api/auth/signin"),
  });

  // Formik
  interface MyFormValues {
    firstname: string;
    lastname: string;
    phone?: string;
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
    firstname: "",
    lastname: "",
  };

  async function handleSubmitRegister(values: MyFormValues) {
    const { firstname, lastname, username, email, password, confirmPassword } =
      values;
    // Check if pw match
    if (password !== confirmPassword) {
      // Throw an error
      const msg = "Passwords Does not Match";
      setErrMsg(msg);
      throw new Error(msg);
    }
    await createUserMutation.mutateAsync({
      email,
      username,
      firstname,
      lastname,
      password,
    });
  }
  return (
    <>
      <main className="mx-auto w-full rounded-lg bg-white shadow  sm:max-w-md md:mt-0 xl:p-0">
        <div className=" p-6 sm:p-8 ">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900  md:text-2xl">
            JewJoe - Register
          </h1>
          {errMsg && (
            <div
              className="mb-4 rounded-lg bg-red-100 p-4 text-sm text-red-700 "
              role="alert"
            >
              <span className="font-medium">Error!</span> {errMsg}
            </div>
          )}
          <Formik initialValues={initialValues} onSubmit={handleSubmitRegister}>
            <Form className="space-y-4 md:space-y-4">
              {/* Firstname */}
              <label className="my-label" htmlFor="firstname">
                First Name
              </label>
              <Field
                id="firstname"
                name="firstname"
                type="text"
                placeholder="firstname"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary sm:text-sm"
              />
              {/* Lasttname */}
              <label className="my-label" htmlFor="lastname">
                Last Name
              </label>
              <Field
                id="lastname"
                name="lastname"
                type="text"
                placeholder="lastname"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary   sm:text-sm"
              />
              {/* Username */}
              <label className="my-label" htmlFor="username">
                Username
              </label>
              <Field
                id="username"
                name="username"
                type="text"
                placeholder="username"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary   sm:text-sm"
              />
              {/* Email */}
              <label className="my-label" htmlFor="email">
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                placeholder="test@test.com"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary   sm:text-sm"
              />
              {/* Password */}
              <label className="my-label" htmlFor="password">
                Password
              </label>
              <Field
                id="password"
                name="password"
                type="password"
                placeholder="Enter Password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary   sm:text-sm"
              />
              {/* Confirm Password */}
              <label className="my-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <Field
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 focus:border-primary focus:ring-primary   sm:text-sm"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-primary px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-primary_hover focus:outline-none focus:ring-4 focus:ring-primary_focus"
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
