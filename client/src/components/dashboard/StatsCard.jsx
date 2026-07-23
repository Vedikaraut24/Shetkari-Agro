import React from "react";

export default function StatsCard({

    title,
    value,
    icon,
    color = "green",
    subtitle = ""

}) {

    const colors = {

        green: "bg-green-100 text-green-700",

        blue: "bg-blue-100 text-blue-700",

        red: "bg-red-100 text-red-700",

        yellow: "bg-yellow-100 text-yellow-700",

        purple: "bg-purple-100 text-purple-700"

    };

    return (

        <div className="bg-white rounded-2xl shadow-md p-5 hover:shadow-xl transition-all">

            <div className="flex justify-between items-center">

                <div>

                    <p className="text-gray-500 text-sm">

                        {title}

                    </p>

                    <h2 className="text-3xl font-bold mt-2">

                        {value}

                    </h2>

                    {

                        subtitle &&

                        <p className="text-xs text-gray-400 mt-2">

                            {subtitle}

                        </p>

                    }

                </div>

                <div

                    className={`h-14 w-14 rounded-full flex items-center justify-center text-2xl ${colors[color]}`}

                >

                    {icon}

                </div>

            </div>

        </div>

    );

}