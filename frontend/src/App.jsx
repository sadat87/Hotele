import { useEffect, useState } from "react";
import HeroSection from "./components/HeroSection";

function App() {
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/api")
      .then(res => res.json())
      .then(data => setMsg(data.message))
      .catch(err => console.log("API not available in demo mode"));
  }, []);

  return (
    <div className="w-full">
      <HeroSection />
      
      {/* Additional sections can go here */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-serif mb-6">Our Promise</h2>
          <p className="text-gray-600 text-lg">{msg || "Experience luxury hospitality like never before"}</p>
        </div>
      </section>
    </div>
  );
}

export default App;
