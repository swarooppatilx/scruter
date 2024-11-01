"use client";

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ContributorsPage: React.FC = () => {
  const [contributors, setContributors] = useState<any[]>([]);
  const [repoStats, setRepoStats] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const contributorsResponse = await axios.get('https://api.github.com/repos/swarooppatilx/scruter/contributors');
        const contributorsData = contributorsResponse.data;

        const repoResponse = await axios.get('https://api.github.com/repos/swarooppatilx/scruter');
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
    <div className="contributors-content">
      <div id="progress-bar" style={{ width: '0%' }}></div>

      <section className="hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 id="heroTitle">Our Amazing Contributors</h1>
          <p id="heroSubtitle">Shaping the future of scruter, one commit at a time</p>
          <a href="#contribute" className="cta-button">Become a Contributor</a>
        </div>
      </section>

      <section className="stats">
        <h2>Project Statistics</h2>
        <div id="stats" className="stats-container">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <>
              <StatCard label="Contributors" value={contributors.length} />
              <StatCard label="Total Contributions" value={contributors.reduce((sum, contributor) => sum + contributor.contributions, 0)} />
              <StatCard label="GitHub Stars" value={repoStats.stargazers_count} />
              <StatCard label="Forks" value={repoStats.forks_count} />
            </>
          )}
        </div>
      </section>

      <section className="contributors">
        <h2>Meet Our Contributors</h2>
        <div id="contributors" className="contributors-container">
          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
            </div>
          ) : (
            contributors.map(contributor => (
              <ContributorCard key={contributor.id} contributor={contributor} />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

const StatCard: React.FC<{ label: string; value: number }> = ({ label, value }) => (
  <div className="stat-card">
    <h3>{value}</h3>
    <p>{label}</p>
  </div>
);

const ContributorCard: React.FC<{ contributor: any }> = ({ contributor }) => (
  <div className="contributor-card">
    <a href={contributor.html_url} target="_blank" className="card-link">
      <img src={contributor.avatar_url} alt={contributor.login} />
      <h3>{contributor.login}</h3>
      <div className="contributions">{contributor.contributions} contributions</div>
    </a>
  </div>
);

export default ContributorsPage;
