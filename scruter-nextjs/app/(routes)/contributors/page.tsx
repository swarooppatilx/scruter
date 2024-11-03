'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../../globals.css'; // Ensure your global styles are imported
import Navbar from '@/components/NavBars&Footers/navbar';
import { Providers } from '@/lib/providers';
import Footer from '@/components/NavBars&Footers/footer';
import CustomCursor from '@/components/ui/CustomCursor';

const ContributorsPage: React.FC = () => {
  const [contributors, setContributors] = useState<any[]>([]);
  const [repoStats, setRepoStats] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const contributorsResponse = await axios.get(
          'https://api.github.com/repos/swarooppatilx/scruter/contributors'
        );
        const contributorsData = contributorsResponse.data;

        const repoResponse = await axios.get(
          'https://api.github.com/repos/swarooppatilx/scruter'
        );
        const repoData = repoResponse.data;

        setContributors(contributorsData);
        setRepoStats(repoData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Providers>
      <CustomCursor />
      <Navbar />
      <div className="bg-gray-50 text-gray-800">
        <div
          id="progress-bar"
          className="fixed top-0 left-0 h-1 bg-green-600 w-0 z-50"
        ></div>
        <section className="relative h-[70vh] flex items-center justify-center bg-blue-300 text-white">
          <div className="absolute inset-0 bg-black opacity-50"></div>
          <div className="relative z-10 max-w-3xl p-4 text-center">
            <h1 className="text-4xl font-bold mb-4" id="heroTitle">
              Our Amazing Contributors
            </h1>
            <p className="text-lg mb-6" id="heroSubtitle">
              Shaping the future of scruter, one commit at a time
            </p>
            <a
              href="#contribute"
              className="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-full transition hover:bg-blue-200"
            >
              Become a Contributor
            </a>
          </div>
        </section>

        <section className="py-16 bg-white">
          <h2 className="text-2xl font-bold text-center mb-12">
            Project Statistics
          </h2>
          <div
            id="stats"
            className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {loading ? (
              <div className="loading">Loading...</div>
            ) : (
              <>
                <StatCard label="Contributors" value={contributors.length} />
                <StatCard
                  label="Total Contributions"
                  value={contributors.reduce(
                    (sum, contributor) => sum + contributor.contributions,
                    0
                  )}
                />
                <StatCard
                  label="GitHub Stars"
                  value={repoStats.stargazers_count}
                />
                <StatCard label="Forks" value={repoStats.forks_count} />
              </>
            )}
          </div>
        </section>

        <section className="py-16 bg-gray-100">
          <h2 className="text-2xl font-bold text-center mb-12">
            Meet Our Contributors
          </h2>
          <div
            id="contributors"
            className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
          >
            {loading ? (
              <div className="loading flex justify-center items-center h-48">
                <div className="spinner border-4 border-gray-300 border-t-4 border-blue-600 rounded-full w-10 h-10 animate-spin"></div>
              </div>
            ) : (
              contributors.map(contributor => (
                <ContributorCard
                  key={contributor.id}
                  contributor={contributor}
                />
              ))
            )}
          </div>
        </section>
      </div>
      <Footer />
    </Providers>
  );
};

const StatCard: React.FC<{ label: string; value: number }> = ({
  label,
  value,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
    <h3 className="text-3xl font-bold text-gray-800">{value}</h3>
    <p className="text-gray-600">{label}</p>
  </div>
);

const ContributorCard: React.FC<{ contributor: any }> = ({ contributor }) => (
  <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
    <a href={contributor.html_url} target="_blank" className="text-center">
      <img
        src={contributor.avatar_url}
        alt={contributor.login}
        className="w-24 h-24 rounded-full border-4 border-blue-500 mb-4"
      />
      <h3 className="text-xl font-bold">{contributor.login}</h3>
      <div className="bg-blue-100 text-blue-800 font-semibold py-1 px-3 rounded-full text-sm">
        {contributor.contributions} contributions
      </div>
    </a>
  </div>
);

export default ContributorsPage;
