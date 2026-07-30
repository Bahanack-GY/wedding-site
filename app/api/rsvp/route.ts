import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Define the path to the data file
const dataFilePath = path.join(process.cwd(), "data", "guests.json");

// Helper to ensure directory and file exist
const ensureFileExists = () => {
  const dirPath = path.dirname(dataFilePath);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([]));
  }
};

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.name || (!data.whatsapp && !data.tel)) {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }
    
    ensureFileExists();
    
    // Read existing guests
    const fileContent = fs.readFileSync(dataFilePath, "utf-8");
    const guests = JSON.parse(fileContent);
    
    // Add new guest with timestamp
    const newGuest = {
      ...data,
      id: Date.now().toString(),
      timestamp: new Date().toISOString(),
    };
    
    guests.push(newGuest);
    
    // Save back to file
    fs.writeFileSync(dataFilePath, JSON.stringify(guests, null, 2));
    
    return NextResponse.json({ success: true, guest: newGuest }, { status: 201 });
  } catch (error) {
    console.error("Failed to save RSVP:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
