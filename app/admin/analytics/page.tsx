"use client";

import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
} from "recharts";
import { toast } from "sonner";
import { Loader2, RefreshCw } from "lucide-react";

interface AnalyticsData {
    voteStats: { date: string; count: number }[];
    siteStats: { date: string; count: number }[];
    topDebates: {
        _id: string;
        title: string;
        slug: string;
        views: number;
        totalVotes: number;
        category: string;
    }[];
}

export default function AnalyticsPage() {
    const [data, setData] = useState<AnalyticsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [voteRange, setVoteRange] = useState("7d");
    const token = localStorage.getItem("adminToken");

    const fetchAnalytics = async () => {
        try {
            setIsLoading(true);
            const res = await fetch(`/api/admin/analytics?range=${voteRange}`, {
                headers: { "x-admin-token": token || "" },
            });
            if (!res.ok) throw new Error("Failed to fetch analytics");
            const jsonData = await res.json();
            setData(jsonData);
        } catch (error) {
            toast.error("Failed to load analytics data");
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    }; // eslint-disable-next-line react-hooks/exhaustive-deps

    useEffect(() => {
        fetchAnalytics();
    }, [voteRange]);

    if (isLoading && !data) {
        return (
            <div className="flex items-center justify-center h-[50vh]">
                <Loader2 className="animate-spin text-gray-500" size={32} />
            </div>
        );
    }

    if (!data) return <div>No data available</div>;

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        Analytics Dashboard
                    </h1>
                    <p className="text-gray-500 mt-2">
                        Monitor website performance and debate engagement.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <select
                        value={voteRange}
                        onChange={(e) => setVoteRange(e.target.value)}
                        className="text-sm border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                    >
                        <option value="7d">Last 7 Days</option>
                        <option value="30d">Last 30 Days</option>
                        <option value="all">All Time</option>
                    </select>
                    <button
                        onClick={fetchAnalytics}
                        className="p-2 text-gray-600 hover:bg-white hover:text-blue-600 bg-gray-50 rounded-lg border border-gray-200 transition-colors shadow-sm"
                        title="Refresh Data"
                    >
                        <RefreshCw
                            size={20}
                            className={isLoading ? "animate-spin" : ""}
                        />
                    </button>
                </div>
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Votes Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-800">
                            Total Votes Trend
                        </h2>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data.voteStats}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f0f0f0"
                                />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12, fill: "#888" }}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(str) => {
                                        const date = new Date(str);
                                        return `${date.getDate()}/${
                                            date.getMonth() + 1
                                        }`;
                                    }}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: "#888" }}
                                    tickLine={false}
                                    axisLine={false}
                                    allowDecimals={false}
                                />
                                <Tooltip
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "none",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="count"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    dot={{ fill: "#3b82f6", strokeWidth: 0 }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Site Views Chart */}
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-800">
                            Website Views
                        </h2>
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            Last {voteRange === "all" ? "Year" : voteRange}
                        </span>
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data.siteStats}>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke="#f0f0f0"
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fontSize: 12, fill: "#888" }}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(str) => {
                                        const date = new Date(str);
                                        return `${date.getDate()}/${
                                            date.getMonth() + 1
                                        }`;
                                    }}
                                />
                                <YAxis
                                    tick={{ fontSize: 12, fill: "#888" }}
                                    tickLine={false}
                                    axisLine={false}
                                    allowDecimals={false}
                                />
                                <Tooltip
                                    cursor={{ fill: "#f9fafb" }}
                                    contentStyle={{
                                        borderRadius: "8px",
                                        border: "none",
                                        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                                    }}
                                />
                                <Bar
                                    dataKey="count"
                                    fill="#8b5cf6"
                                    radius={[4, 4, 0, 0]}
                                    barSize={20}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Top Debates Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                    <h2 className="text-lg font-bold text-gray-800">
                        Top Viewed Debates
                    </h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Debate Title
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Category
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Views
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    Votes
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.topDebates.length > 0 ? (
                                data.topDebates.map((debate) => (
                                    <tr
                                        key={debate._id}
                                        className="hover:bg-gray-50 transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <a
                                                href={`/debate/${debate.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm font-medium text-gray-900 hover:text-blue-600 hover:underline line-clamp-1"
                                            >
                                                {debate.title}
                                            </a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                                {debate.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono-numbers">
                                            {debate.views || 0}
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-600 font-mono-numbers">
                                            {debate.totalVotes}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan={4}
                                        className="px-6 py-8 text-center text-gray-500 text-sm"
                                    >
                                        No debates found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
