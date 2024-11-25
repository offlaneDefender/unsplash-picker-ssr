import Form from "next/form";
import { preferences } from "./client/constants";

export default function Home() {
  
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Form className="flex flex-col gap-4 items-center" action={'/client'}>
          <input className="text-black" type="text" id="name" name="name" required placeholder="First name" />
          <input className="text-black" type="text" id="surname" name="surname" required placeholder="Last name" />
          <select className="text-black" name="preference" id="preference" required>
            <option value="" disabled>Select a preference</option>
            {preferences.map((pref) => (
              <option key={pref} value={pref}>{pref}</option>
            ))}
          </select>
          <button type="submit">Search</button>
        </Form>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>footer</p>
      </footer>
    </div>
  );
}
