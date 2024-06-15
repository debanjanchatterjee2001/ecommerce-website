import Link from "next/link";

export const metadata = {
  title: "Cars Website - Page not found",
};

export default function NotFoundPage() {
  return (
    <section className="bg-base-100">
      <div className="py-8 px-4 my-6 max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-gray-900 md:text-4xl">
            {"Something's missing."}
          </p>
          <p className="mb-4 text-lg font-light text-gray-500">
            {
              "Sorry, we can't find that page. You'll find lots to explore on the home page. "
            }
          </p>
          <Link
            href="/"
            className="inline-flex text-white bg-blue-500 hover:bg-blue-800 focus:ring-3 focus:outline-none focus:ring-blue-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
