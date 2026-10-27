import { Link } from "react-router-dom";

const btn =
  "inline-flex items-center justify-center rounded-md px-5 py-2.5 text-sm font-semibold transition-colors";

export default function Home() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
      <div className="flex flex-col align-center justify-center text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold sm:text-5xl sm:leading-tight">
          Know what's on your shelves.
        </h1>
        <p className="mt-4 text-base text-muted sm:text-lg">
          Stockly helps small businesses track products, stock levels and
          sales, so you always know what to reorder.
        </p>

        <div className="mt-8 flex justify-center flex-wrap gap-3">
          <Link
            to="/register"
            className={`${btn} bg-primary text-white hover:bg-primary-hover`}
          >
            Create an account
          </Link>
          <Link
            to="/login"
            className={`${btn} border bg-surface text-primary hover:bg-page`}
          >
            Log in
          </Link>
        </div>
      </div>
    </section>
  );
}