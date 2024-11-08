'use client';

import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Spinner } from '@/components/ui/spinner';

import Image from 'next/image'
import ContributorCardd from '../../contributors/components/contributorCard';
interface Contributor {
  login: string;
  id: number;
  node_id: string;
  avatar_url: string;
  gravatar_id: string;
  url: string;
  html_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  starred_url: string;
  subscriptions_url: string;
  organizations_url: string;
  repos_url: string;
  events_url: string;
  received_events_url: string;
  type: string;
  user_view_type: string;
  site_admin: boolean;
  contributions: number;
}

const ContributorsPage: React.FC = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [repoStats, setRepoStats] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const [rowEnds, setRowEnds] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const contributorsResponse = await axios.get(
          'https://api.github.com/repos/swarooppatilx/scruter/contributors?per_page=100&anon=true'
        );
        const contributorsData: Contributor[] = contributorsResponse.data.filter(
          (contributor: Contributor) => contributor.login !== 'dependabot[bot]'
        );
    
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

  

  if(loading||!contributors){
    return <Spinner/>
  }

  console.log(contributors)

  return (
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
        {/* <h2 className="text-2xl font-bold text-center mb-12">
          Meet Our Contributors
        </h2>
        <div
          id="contributors"
          className="max-w-4xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8" // Changed to grid-cols-4
        >
          {loading ? (
            <div className="loading flex justify-center items-center h-48">
              <div className="spinner border-4 border-t-4 border-blue-600 rounded-full w-10 h-10 animate-spin"></div>
            </div>
          ) : (
            contributors.map(contributor => (
              <ContributorCard key={contributor.id} contributor={contributor} />
            ))
          )}
        </div> */}
        <>
          <div className="bg-gray-100 dark:bg-DarkGray pb-10 text-gray-900 dark:text-white transition-colors duration-300">
            <div className="flex justify-center flex-col items-center">
              <div className="h-full w-full">
                <div className="text-center my-8">
                  <h1 className="text-4xl font-bold text-customTeal dark:text-Green">
                    Meet Our Contributors
                  </h1>
                  <p className="text-lg mt-2 text-center w-1/2 mx-auto">
                    &quot;Meet our GitHub contributors who work around the
                    clock, blending day and night to add features, fix bugs, and
                    make Scruter a success!
                    {/* <i className="fas fa-heart">
    </i> */}
                    &quot;
                  </p>
                </div>
              </div>
              {loading ? (
                <div className="flex justify-center items-center">
                  <Spinner />
                </div>
              ) : (
                <>
                  <div className="mt-10">
                    <div className="flex w-full justify-between items-center">
                      {/* First Image
                      width={100}
                      height={100} on the Left */}
                      <div className="flex md:w-1/4 md:mr-auto  md:block">
                        <Image
                        
                          alt=""
                          width={100}
                          height={100}
                          src="/contributorsPage/left_blue.png"
                          className="dark:hidden"
                        />
                      </div>
                      <div className="flex flex-col items-center md:flex-row  h-full md:pt-1">
                        {/* First Contributor (index 2) */}

                        <div className="text-center mt-5 w-64 mx-auto md:mx-3 md:w-48 md:mt-10 order-2 md:order-1">
                          <div className="relative inline-block transform transition-transform duration-300 hover:scale-110 cursor-pointer">
                            <Image
                            width={100}
                            height={100}
                              alt=""
                              className="rounded-full border-8 border-customTeal dark:border-Green"
                              onClick={() =>
                                window.open(contributors[2].html_url, '_blank')
                              }
                              src={contributors[2].avatar_url}
                            />
                            <div className="absolute bottom-0 right-0 bg-customTeal dark:bg-[#e9be1e] text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                              2
                            </div>
                          </div>
                          <div className="mt-2">
                            <span
                              className="cursor-pointer"
                              onClick={() =>
                                window.open(
                                  `https://github.com/swarooppatilx/scruter/commits/main/?author=${contributors[2].login}`,
                                  '_blank'
                                )
                              }
                            >
                              Contributions {contributors[2].contributions}
                            </span>
                            <div className="bg-customTeal md:mt-2 dark:bg-gradient-to-r dark:from-[#4caf50] dark:to-[#e9be1e] text-black font-bold py-1 px-4 rounded-full whitespace-nowrap">
                              <button
                                onClick={() =>
                                  window.open(
                                    contributors[2].html_url,
                                    '_blank'
                                  )
                                }
                              >
                                {contributors[2].login}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Second Contributor (index 1) */}
                        <div className="relative text-center w-64 mx-auto md:mx-5  md:w-64 flex-shrink-0 order-1 md:order-2">
                         
                          <Image
                          width={100}
                          height={100}
                            src="/contributorsPage/glitter_blue_right.png"
                            alt="Glitter decoration"
                            className="absolute -top-10 -right-10 w-16 h-16 dark:hidden"
                          />
                          <Image
                          width={100}
                          height={100}
                            src="/contributorsPage/glitter_blue_left.png"
                            alt="Glitter decoration"
                            className="absolute -top-10 -left-10 w-16 h-16 dark:hidden"
                          />

                          <div className="relative inline-block transform transition-transform duration-300 hover:scale-110 cursor-pointer">
                            <Image
                            width={100}
                            height={100}
                              alt="A person in a suit working on a laptop and holding a phone"
                              className="rounded-full border-8 border-customTeal dark:border-Green"
                              onClick={() =>
                                window.open(contributors[1].html_url, '_blank')
                              }
                              src={contributors[1].avatar_url}
                        
                            />
                            <div className="absolute bottom-0 right-0 bg-customTeal dark:bg-[#e9be1e] text-white rounded-full w-12 h-12 flex items-center justify-center text-xl">
                              1
                            </div>
                          </div>
                          <div className="mt-2">
                            <span
                              className="cursor-pointer"
                              onClick={() =>
                                window.open(
                                  `https://github.com/swarooppatilx/scruter/commits/main/?author=${contributors[1].login}`,
                                  '_blank'
                                )
                              }
                            >
                              Contributions {contributors[1].contributions}
                            </span>
                            <div className="bg-customTeal md:mt-2 dark:bg-gradient-to-r dark:from-[#4caf50] dark:to-[#e9be1e]  text-black font-bold py-1 px-4 rounded-full whitespace-nowrap">
                              <button
                                onClick={() =>
                                  window.open(
                                    contributors[1].html_url,
                                    '_blank'
                                  )
                                }
                              >
                                {contributors[1].login}
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Third Contributor (index 3) */}
                        <div className="text-center mt-5 w-64 mx-auto md:mx-3 md:w-48 md:mt-10 order-3 md:order-3">
                          <div className="relative inline-block transform transition-transform duration-300 hover:scale-110 cursor-pointer">
                            <Image
                            width={100}
                            height={100}
                              alt="A person in a suit working on a laptop and holding a phone"
                              className="rounded-full border-8 border-customTeal dark:border-Green"
                              onClick={() =>
                                window.open(contributors[3].html_url, '_blank')
                              }
                           
                              src={contributors[3].avatar_url}
          
                            />
                            <div className="absolute bottom-0 right-0 bg-customTeal dark:bg-[#e9be1e] text-white rounded-full w-10 h-10 flex items-center justify-center text-xl">
                              3
                            </div>
                          </div>
                          <div className="mt-2">
                            <span
                              className="cursor-pointer"
                              onClick={() =>
                                window.open(
                                  `https://github.com/swarooppatilx/scruter/commits/main/?author=${contributors[3].login}`,
                                  '_blank'
                                )
                              }
                            >
                              Contributions {contributors[3].contributions}
                            </span>
                            <div className="bg-customTeal md:mt-2 dark:bg-gradient-to-r dark:from-[#4caf50] dark:to-[#e9be1e] text-black font-bold py-1 px-4 rounded-full whitespace-nowrap">
                              <button
                                onClick={() =>
                                  window.open(
                                    contributors[3].html_url,
                                    '_blank'
                                  )
                                }
                              >
                                {contributors[3].login}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex md:h-auto md:w-1/4  md:block">
                      
                        <Image
                        width={100}
                        height={100}
                          alt=""
                          src="/contributorsPage/right_blue.png"
                          className="dark:hidden"
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    ref={containerRef}
                    id="contributor-container"
                    className="flex flex-col flex-wrap justify-center md:flex-row md:mt-16"
                  >
                    {contributors.slice(4).map((contributor, index) => {
                      const isRowEnd = rowEnds.includes(index);
                      const hasNextCard =
                        index < contributors.length - 1 && isRowEnd;
                      return (
                        <ContributorCardd
                          key={contributor.id}
                          contributor={contributor}
                          hasNextCard={hasNextCard}
                          index={index}
                        />
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          </div>
        </>
      </section>
    </div>

    // <div>
    //   HII
    // </div>
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



export default ContributorsPage;
