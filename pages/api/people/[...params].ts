import { Person } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  results?: Person[];
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const { params } = req.query;
    const [page, seed] = params;
    console.log('page:', page);
    console.log('seed:', seed);

    if (params?.length < 1) {
      res.status(500).json({ error: "wrong path" });
      return;
    }
    const response = await fetch(`https://randomuser.me/api/?results=10&page=${page}&seed=${seed || ''}`);
    const data = await response.json();
    res.status(200).json(data as any);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
