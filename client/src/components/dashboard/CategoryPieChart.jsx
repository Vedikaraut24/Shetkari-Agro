import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";

const COLORS = [
    "#16a34a",
    "#f59e0b",
    "#3b82f6",
    "#ef4444",
    "#8b5cf6",
    "#14b8a6",
    "#ec4899"
];

export default function CategoryPieChart({ data }) {

    return (

        <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="text-xl font-bold mb-5">

                Category Distribution

            </h2>

            <ResponsiveContainer width="100%" height={320}>

                <PieChart>

                    <Pie

                        data={data}

                        dataKey="value"

                        nameKey="name"

                        outerRadius={110}

                        label

                    >

                        {

                            data.map((entry, index) => (

                                <Cell

                                    key={index}

                                    fill={COLORS[index % COLORS.length]}

                                />

                            ))

                        }

                    </Pie>

                    <Tooltip />

                    <Legend />

                </PieChart>

            </ResponsiveContainer>

        </div>

    );

}