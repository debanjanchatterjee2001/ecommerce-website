import { redirect } from "next/navigation";

async function searchCars(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default function SearchForm() {
  return (
    <form action={searchCars}>
      <div className="form-control">
        <input
          type="text"
          name="searchQuery"
          placeholder="Search"
          className="input input-bordered w-24 md:w-auto"
        />
      </div>
    </form>
  );
}
