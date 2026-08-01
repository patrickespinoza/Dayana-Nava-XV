import { useState } from "react";

export default function Generador() {
  const [nombre, setNombre] = useState("");
  const [pases, setPases] = useState(1);
  const [link, setLink] = useState("");

  const generarLink = () => {
    if (!nombre) return;

    const url = `${window.location.origin}/?nombre=${encodeURIComponent(nombre)}&pases=${pases}`;
    setLink(url);
  };

  const copiarLink = async () => {
    if (!link) return;
    await navigator.clipboard.writeText(link);
    alert("Link copiado ✅");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f5f5f5] p-6">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center">
          Generador de Invitaciones
        </h1>

        <input
          type="text"
          placeholder="Nombre del invitado"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <input
          type="number"
          min="1"
          value={pases}
          onChange={(e) => setPases(e.target.value)}
          className="w-full mb-4 p-3 border rounded-lg"
        />

        <button
          onClick={generarLink}
          className="w-full bg-[#6b705c] text-white py-3 rounded-lg mb-4"
        >
          Generar link
        </button>

        {link && (
          <div className="bg-gray-100 p-3 rounded-lg break-all text-sm mb-4">
            {link}
          </div>
        )}

        {link && (
          <button
            onClick={copiarLink}
            className="w-full bg-black text-white py-3 rounded-lg"
          >
            Copiar link
          </button>
        )}
      </div>
    </div>
  );
}