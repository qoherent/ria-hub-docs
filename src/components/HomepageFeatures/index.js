import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

// *** IMPORTANT: Create or find relevant SVG icons and update the paths below ***
// You can use sites like unDraw (like the originals), FontAwesome, Heroicons,
// or create your own custom SVGs. Place them in /static/img/.

const FeatureList = [
  {
    title: 'All-in-One Development Hub',
    // *** REPLACE with relevant SVG *** eg code branching, server stack, workflow
    Svg: require('@site/static/img/ria.svg').default,
    description: (
      <>
        Manage your Git repositories, review code, collaborate with your team,
        host packages, and automate CI/CD pipelines—all from your self-hosted RIA Hub instance.
      </>
    ),
  },
  {
    title: 'Tailored for ML & Radio SDR',
    // *** REPLACE with relevant SVG *** eg brain/gears for ML, signal waves for SDR
    Svg: require('@site/static/img/ria.svg').default,
    description: (
      <>
        Built with the needs of Machine Learning and Software-Defined Radio projects in mind.
        Handle large artifacts (with Git LFS), manage complex workflows, and foster focused collaboration.
      </>
    ),
  },
  {
    title: 'Lightweight & Easy Deployment',
    // *** REPLACE with relevant SVG *** eg rocket, checklist, gears
    Svg: require('@site/static/img/ria.svg').default,
    description: (
      <>
        Run RIA Hub efficiently even on low-resource hardware like a Raspberry Pi.
        Deploy easily across Linux, macOS, and Windows thanks to its Go-based architecture.
      </>
    ),
  },
];

// No changes needed below this line for functionality
function Feature({ Svg, title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        {/* Make sure the SVG styling works for your new icons */}
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}