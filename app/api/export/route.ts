import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const authCookie = request.cookies.get("admin_auth");
    if (authCookie?.value !== "true") {
      return new NextResponse("Non autorisé", { status: 401 });
    }

    const dataFilePath = path.join(process.cwd(), "data", "guests.json");
    
    if (!fs.existsSync(dataFilePath)) {
      return new NextResponse("Fichier introuvable", { status: 404 });
    }
    
    const fileContent = fs.readFileSync(dataFilePath, "utf-8");
    const guests = JSON.parse(fileContent);
    
    // CSV Header
    const csvRows = [
      ["Nom", "WhatsApp", "Telephone", "Accompagnants", "Date de reponse"].join(",")
    ];
    
    // CSV Data
    for (const guest of guests) {
      const date = new Date(guest.timestamp).toLocaleDateString("fr-FR");
      const name = `"${(guest.name || "").replace(/"/g, '""')}"`;
      const whatsapp = `"${guest.whatsapp || ""}"`;
      const tel = `"${guest.tel || ""}"`;
      const accompanying = guest.accompanying || 0;
      
      csvRows.push([name, whatsapp, tel, accompanying, `"${date}"`].join(","));
    }
    
    const csvString = csvRows.join("\n");
    
    return new NextResponse(csvString, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="invites_mariage_${new Date().toISOString().split("T")[0]}.csv"`,
      },
    });
  } catch (error) {
    console.error("Export error:", error);
    return new NextResponse("Erreur lors de l'export", { status: 500 });
  }
}
