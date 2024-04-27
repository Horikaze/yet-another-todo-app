"use server";

import { nanoid } from "nanoid";
import db from "./db";

export const createNewUser = async () => {
  try {
    const newUser = await db.user.create({
      data: {
        userId: nanoid(5),
        cards: {
          create: {
            cards: "[]",
          },
        },
      },
    });

    return newUser;
  } catch (error) {
    return null;
  }
};

export const getCardsFromDb = async (formData: FormData) => {
  try {
    const userId = formData.get("userId") as string;
    const cards = await db.cards.findFirst({
      where: {
        userUserId: userId,
      },
    });
    console.log(cards);
    return cards;
  } catch (error) {
    return null;
  }
};

type syncWithDbProps = {
  userId: string;
  cards: CardType[];
};

export const syncWithDb = async ({ cards, userId }: syncWithDbProps) => {
  try {
    await db.cards.update({
      where: {
        userUserId: userId,
      },
      data: {
        cards: JSON.stringify(cards),
      },
    });
    console.log(cards);
    return cards;
  } catch (error) {
    return null;
  }
};
