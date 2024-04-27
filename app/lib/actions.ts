"use server";

import { nanoid } from "nanoid";
import db from "./db";

export const createNewUser = async () => {
  try {
    console.log("meow");
    const newUser = await db.user.create({
      data: {
        userId: nanoid(5),
      },
    });
    return newUser;
  } catch (error) {
    return null;
  }
};

