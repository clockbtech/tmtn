
import { motion } from 'framer-motion';
const BlogHero = () => {
  return <section className="relative bg-cover bg-center bg-no-repeat py-[150px]" style={{
    backgroundImage: 'url(https://images.pexels.com/photos/31410274/pexels-photo-31410274.jpeg)'
  }}>
          <div className="absolute inset-0 bg-gradient-to-r from-green-600/80 to-green-800/80"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.8
      }} className="text-center text-white">
              <h1 className="text-5xl font-tm-sans mb-6 lg:text-6xl font-extrabold">
               Blog
              </h1>
              <p className="text-xl max-w-4xl mx-auto lg:text-xl">
                Stories & Travel Guides from the Heart of Nepal
              </p>
            </motion.div>
          </div>
        </section>;
};
export default BlogHero;
