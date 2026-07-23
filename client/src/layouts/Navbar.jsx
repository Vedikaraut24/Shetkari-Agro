export default function Navbar() {
  return (
    <header className="bg-white shadow-md px-6 py-4 flex justify-between items-center">

      <div>
        <h2 className="text-2xl font-bold text-green-700">
          स्वागत आहे, रुषिकेश बंड 👋
        </h2>
      </div>

      <div className="flex items-center gap-5">

        <i className="bi bi-search text-xl cursor-pointer"></i>

        <i className="bi bi-bell text-xl cursor-pointer"></i>

        <i className="bi bi-moon text-xl cursor-pointer"></i>

        <div className="w-10 h-10 rounded-full bg-green-700 text-white flex items-center justify-center font-bold">
          R
        </div>

      </div>

    </header>
  );
}