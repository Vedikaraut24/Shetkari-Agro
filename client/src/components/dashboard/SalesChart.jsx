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

    data = []

}) {

    const months = [

        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"

    ];

    const chartData = data.map(item => ({

        month: months[item._id?.month] || "-",

        sales: item.sales

    }));

    return (

        <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-xl font-bold text-green-700 mb-5">

                Monthly Sales

            </h2>

            <ResponsiveContainer

                width="100%"

                height={320}

            >

                <LineChart

                    data={chartData}

                >

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