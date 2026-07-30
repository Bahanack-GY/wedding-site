import fs from "fs";
import path from "path";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import LoginForm from "@/components/LoginForm";

export const dynamic = "force-dynamic";

interface Guest {
  id: string;
  name: string;
  whatsapp: string;
  tel: string;
  accompanying: number;
  timestamp: string;
}

async function getGuests(): Promise<Guest[]> {
  const dataFilePath = path.join(process.cwd(), "data", "guests.json");
  try {
    if (!fs.existsSync(dataFilePath)) return [];
    const fileContent = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(fileContent);
  } catch (error) {
    console.error("Error reading guests file:", error);
    return [];
  }
}

export default async function AdminPage() {
  const cookieStore = await cookies();
  const isAuthenticated = cookieStore.get("admin_auth")?.value === "true";

  async function login(formData: FormData) {
    "use server";
    const password = formData.get("password");
    if (password === (process.env.ADMIN_PASSWORD || "mariage2026")) {
      const cookieStore = await cookies();
      cookieStore.set("admin_auth", "true", { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === "production" 
      });
      revalidatePath("/admin");
    }
  }

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen p-8 flex items-center justify-center bg-background">
        <LoginForm action={login} />
      </main>
    );
  }

  const guests = await getGuests();
  
  const totalGuests = guests.length + guests.reduce((sum, g) => sum + (Number(g.accompanying) || 0), 0);

  return (
    <main className="min-h-screen p-8 md:p-24 bg-background">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-8">
          <h1 className="text-4xl font-belinda text-cream">Tableau de bord - RSVPs</h1>
          <a 
            href="/api/export" 
            className="inline-block px-6 py-3 bg-sand text-background font-sans text-xs tracking-widest uppercase rounded-lg hover:bg-terracotta transition-colors shadow-sm font-semibold text-center shrink-0"
          >
            Télécharger (Excel / CSV)
          </a>
        </div>
        
        <div className="bg-sand/10 p-6 mb-12 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center rounded-2xl">
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase tracking-widest text-cream/70">Total des personnes attendues</p>
            <p className="text-6xl font-belinda text-sand leading-none pt-2">{totalGuests}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm uppercase tracking-widest text-cream/70">Formulaires soumis</p>
            <p className="text-6xl font-belinda text-cream leading-none pt-2">{guests.length}</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-cream/20 text-sm uppercase tracking-widest text-cream/70">
                <th className="py-4 pr-4">Nom</th>
                <th className="py-4 px-4">WhatsApp</th>
                <th className="py-4 px-4">Téléphone</th>
                <th className="py-4 px-4">Accompagnants</th>
                <th className="py-4 pl-4 text-right">Date</th>
              </tr>
            </thead>
            <tbody>
              {guests.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-cream/50 italic">Aucune réponse pour le moment.</td>
                </tr>
              ) : (
                guests.map((guest) => (
                  <tr key={guest.id} className="border-b border-cream/10 hover:bg-sand/10 transition-colors">
                    <td className="py-4 pr-4 font-serif text-cream">{guest.name}</td>
                    <td className="py-4 px-4 text-cream/80">{guest.whatsapp || "-"}</td>
                    <td className="py-4 px-4 text-cream/80">{guest.tel || "-"}</td>
                    <td className="py-4 px-4 text-center text-cream/80">{guest.accompanying}</td>
                    <td className="py-4 pl-4 text-right text-sm text-cream/60">
                      {new Date(guest.timestamp).toLocaleDateString("fr-FR")}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
