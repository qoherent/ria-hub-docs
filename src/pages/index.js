import React from 'react';
import Layout from '@theme/Layout';
import '../css/custom.css'; // Just import the CSS for side effects
import { FaCodeBranch, FaRocket, FaShieldAlt, FaProjectDiagram } from 'react-icons/fa';

export default function Home() {
  return (
    <Layout title="RIA Hub Documentation" description="Self-hosted Git service for everyone.">
      <header className="hero">
        <div className="globeContainer">
          <div className="globe"></div>
          <div className="orbit">
            <FaCodeBranch className="icon icon1" />
            <FaRocket className="icon icon2" />
            <FaShieldAlt className="icon icon3" />
            <FaProjectDiagram className="icon icon4" />
          </div>
        </div>
        <h1 className="title">Welcome to RIA Hub</h1>
        <p className="subtitle">
          Fast, painless, and fully self-hosted Git service with everything built in.
        </p>
        <a className="ctaButton" href="/docs/">
          🚀 Explore the Docs
        </a>
      </header>
    </Layout>
  );
}
