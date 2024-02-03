import { User } from "../payload-types";
import { Access, CollectionConfig } from "payload/types";

const youOwnAndPurchased: Access = async ({ req }) => {
  const user = req.user as User | null;

  if (!user) {
    return false;
  }

  if (user.role === "admin") {
    return true;
  }

  const { docs: products } = await req.payload.find({
    collection: "products",
    depth: 0,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const ownProductFileIds = products
    .map((product) => product.product_files)
    .flat();

  const { docs: orders } = await req.payload.find({
    collection: "orders",
    depth: 2,
    where: {
      user: {
        equals: user.id,
      },
    },
  });

  const purschasedProductFileIds = orders
    .map((order) => {
      return order.products.map((product) => {
        if (typeof product === "string") {
          return req.payload.logger.error(
            "Search depth not sufficient to find purchased file IDs"
          );
        }

        return typeof product.product_files === "string"
          ? product.product_files
          : product.product_files.id;
      });
    })
    .filter(Boolean)
    .flat();

  return {
    id: {
      in: [...ownProductFileIds, ...purschasedProductFileIds],
    },
  };
};

export const ProductFiles: CollectionConfig = {
  slug: "product_files",
  admin: {
    hidden: ({ user }) => user.role !== "admin",
  },
  hooks: {
    beforeChange: [
      ({ req, data }) => {
        return { ...data, user: req.user?.id };
      },
    ],
  },
  access: {
    read: youOwnAndPurchased,
    update: ({ req }) => req.user.role === "admin",
    delete: ({ req }) => req.user.role === "admin",
  },
  upload: {
    staticURL: "/product_files",
    staticDir: "product_files",
    mimeTypes: ["image/*", "font/*", "application/postscript"],
  },
  fields: [
    {
      name: "user",
      type: "relationship",
      relationTo: "users",
      admin: {
        condition: () => false,
      },
      hasMany: false,
      required: true,
    },
  ],
};
