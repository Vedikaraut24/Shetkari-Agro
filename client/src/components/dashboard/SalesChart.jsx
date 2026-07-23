import {

    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid

} from "recharts";

export default function SalesChart({

    data

}) {

    return (

        <div className="bg-white rounded-2xl shadow p-5">

            <h2 className="text-xl font-bold mb-5">

                Monthly Sales

            </h2>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <LineChart data={data}>

                    <CartesianGrid strokeDasharray="3 3" />

                    <XAxis dataKey="month" />

                    <YAxis />

                    <Tooltip />

                    <Line

                        type="monotone"

                        dataKey="sales"

                        stroke="#16a34a"

                        strokeWidth={3}

                    />

                </LineChart>

            </ResponsiveContainer>

        </div>

    );

}