import AddItemButton from "@/components/AddItemButton";
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";

export const metadata = {
  title: "Add car - Cars Website",
};

async function addItem(formData: FormData) {
  "use server";

  const name = formData.get("name")?.toString();
  const make = formData.get("make")?.toString().replaceAll(" ", "-");
  const model = formData.get("model")?.toString().replaceAll(" ", "-");
  const category = formData.get("category")?.toString().replaceAll(" ", "-");
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);

  if (
    !name ||
    !make ||
    !model ||
    !category ||
    !description ||
    !imageUrl ||
    !price
  ) {
    throw Error("Missing required field/fields.");
  }

  await prisma.car.create({
    data: { name, make, model, category, description, imageUrl, price },
  });

  revalidatePath("/add-item");
}

export default function AddItemPage() {
  return (
    <>
      <div className="flex bg-info">
        <h1 className="m-4 font-bold text-primary-content text-2xl">
          Add a Car to the database
        </h1>
      </div>
      <div className="flex flex-col mt-3 p-2">
        <form className="flex flex-col" action={addItem}>
          <input
            required
            name="name"
            type="text"
            placeholder="Enter name of car"
            className="input input-bordered input-accent m-3 p-2"
          />
          <div className="flow-root m-1 p-2">
            <input
              required
              name="make"
              type="text"
              placeholder="Enter the brand"
              className="float-left input input-bordered input-accent w-2/5"
            />
            <input
              required
              name="model"
              type="text"
              placeholder="Enter the model"
              className="float-right input input-bordered input-accent w-2/5"
            />
          </div>
          <select
            required
            name="category"
            className="m-3 p-2 select select-accent"
          >
            <option disabled selected>
              Pick your car category
            </option>
            <option>Hatchback</option>
            <option>Sedan</option>
            <option>SUV</option>
            <option>Off-road-SUV</option>
            <option>Luxury</option>
            <option>Sports-Car</option>
            <option>EV</option>
            <option>Luxury-EV</option>
            <option>Pick-up-Truck</option>
            <option>Electric-Pick-up-Truck</option>
          </select>
          <textarea
            required
            name="description"
            className="m-3 p-2 textarea textarea-bordered textarea-accent"
            placeholder="Put some description"
          ></textarea>
          <input
            required
            name="imageUrl"
            type="url"
            placeholder="Enter image URL"
            className="m-3 p-2 input input-bordered input-accent"
          />
          <input
            required
            name="price"
            type="text"
            placeholder="Enter price of car"
            className="m-3 p-2 input input-bordered input-accent"
          />
          <AddItemButton className="m-3 p-2">Add to DB</AddItemButton>
        </form>
      </div>
    </>
  );
}
