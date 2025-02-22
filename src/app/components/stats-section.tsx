"use client";

import Container from "@/components/container";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from "chart.js";
import { motion } from "motion/react";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement
);

export default function StatsSection() {
  const stats = [
    {
      title: "Improved Email Reputation",
      description:
        "Reduce spam placement by ensuring consistent inboxing\nthrough warm-up and optimization.",
    },
    {
      title: "95%+ Inbox Success Rate",
      description:
        "Achieve 90-95% true inbox placement within two weeks\nusing advanced AI-powered techniques.",
    },
    {
      title: "Spam Reduction Strategies",
      description:
        "Smart email rotation and adaptive sending patterns\nto minimize spam detection risks.",
    },
    {
      title: "Scalable Email Delivery",
      description:
        "Optimized email-sending infrastructure to handle high-volume\ncampaigns without triggering spam filters.",
    },
  ];

  const chartData = {
    labels: Array.from({ length: 15 }, (_, i) => `Day ${i + 1}`),
    datasets: [
      {
        type: "line" as const,
        label: "Inboxing Rate",
        borderColor: "rgba(59, 130, 246, 0.8)",
        borderWidth: 3,
        fill: true,
        data: [
          200, 450, 400, 350, 500, 450, 400, 450, 400, 500, 800, 700, 900, 1200,
          1500,
        ],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
      },
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.5)",
          maxRotation: 0,
          autoSkip: true,
          maxTicksLimit: 5,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        mode: "index" as const,
        intersect: false,
      },
    },
  };

  return (
    <Container id="benefits">
      <div className="relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 backdrop-blur-sm mb-8"
          >
            <span className="text-sm text-blue-400">Benefits</span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-3xl md:text-6xl font-semibold font-aspekta text-white mb-4"
          >
            Boost Your Email Deliverability Rate
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg lg:text-xl">
            Track your email performance and deliverability with our advanced
            analytics
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-6 gap-6"
        >
          <div className="lg:col-span-2 space-y-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                viewport={{ once: true }}
                className="bg-white/[0.03] backdrop-blur-sm rounded-xl border border-white/10 p-4"
              >
                <h3 className="text-xl font-bold text-white mb-1">
                  {stat.title}
                </h3>
                <p className="text-gray-400 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="lg:col-span-4 bg-white/[0.03] backdrop-blur-sm rounded-2xl border border-white/10 p-6">
            <div className="h-[400px]">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <Line options={chartOptions} data={chartData as any} />
            </div>
          </div>
        </motion.div>
      </div>
    </Container>
  );
}
