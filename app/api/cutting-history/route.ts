// app/api/cutting-history/route.ts
import { NextRequest, NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("react-web-app");
    const collection = db.collection(
      "cuttingHistory-" + process.env.NEXT_PUBLIC_MODE
    );

    const history = await collection.find({}).toArray();
    return NextResponse.json(history);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error connecting to database" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db("react-web-app");
    const collection = db.collection(
      "cuttingHistory-" + process.env.NEXT_PUBLIC_MODE
    );

    const data = await request.json();
    const result = await collection.insertOne(data);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error connecting to database" },
      { status: 500 }
    );
  }
}