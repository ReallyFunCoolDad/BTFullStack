export default function About() {
  return (
    <div className="flex justify-center h-1/6">
      <div className="p-4 m-8 font-serif text-center text-sky-800 sm:w-2/3 sm:leading-loose sm:text-xl">
        <p className="sm:text-2xl">
          {" "}
          Welcome to{" "}
          <span className="font-semibold">Barnett Technologies.</span>
        </p>
        <p className="mt-2 text-gray-500">
          Choose a service below to get started!
        </p>
      </div>
    </div>
  );
}
