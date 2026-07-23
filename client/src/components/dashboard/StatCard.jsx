import { motion } from "framer-motion";

export default function StatCard({
  title,
  value,
  icon,
  color,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="rounded-2xl bg-white shadow-lg p-6 border-l-4"
      style={{ borderColor: color }}
    >
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-500">{title}</p>

          <h2 className="text-3xl font-bold mt-3">
            {value}
          </h2>
        </div>

        <div
          className="text-5xl"
          style={{ color }}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}