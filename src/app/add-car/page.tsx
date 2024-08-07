import AddItemButton from "@/components/AddItemButton";
import { prisma } from "@/lib/db/prisma";
import {
  LoginLink,
  getKindeServerSession,
} from "@kinde-oss/kinde-auth-nextjs/server";
import { revalidatePath } from "next/cache";
import Link from "next/link";

export const metadata = {
  title: "Add car - Roadio",
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

export default async function AddItemPage() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  return (
    <>
      <div className="m-4 px-4 flex rounded-xl bg-info">
        <h1 className="m-4 font-bold text-primary-content text-2xl">
          Add a Car to the database
        </h1>
      </div>
      {user && user.email && process.env.ADMIN_EMAIL?.includes(user.email) ? (
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
              <option value="Hatchback">Hatchback</option>
              <option value="Sedan">Sedan</option>
              <option value="SUV">SUV</option>
              <option value="Off-road SUV">Off-road SUV</option>
              <option value="Luxury">Luxury</option>
              <option value="Sports-Car">Sports Car</option>
              <option value="EV">EV</option>
              <option value="Luxury-EV">Luxury EV</option>
              <option value="Pick-up-Truck">Pick-up Truck</option>
              <option value="Electric-Pick-up-Truck">
                Electric Pick-up Truck
              </option>
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
      ) : (
        <div className="mx-3 mt-1 mb-80 p-2 justify-center text-center">
          <p>{"You don't have access this page."}</p>
          {!user ? (
            <LoginLink className="my-5 btn btn-lg btn-accent rounded-lg">
              Log in
            </LoginLink>
          ) : (
            <Link href={"/"} className="my-5 btn btn-lg btn-primary rounded-lg">
              Back to home
            </Link>
          )}
        </div>
      )}
    </>
  );
}
