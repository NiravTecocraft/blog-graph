import React from 'react';

import Link from 'next/link';

const BlogCard = ({ title, author, coverPhoto, datePublished, slug }) => {
  console.log(coverPhoto);
  return (
    <>
      {/* <div className={styles.card}>
        <Link href={'/posts/' + slug}>
          <div className={styles.imgContainer}>
            <img src={coverPhoto.url} alt='' className='img-fluid' />
          </div>
        </Link>

        <div className={styles.text}>
          <h2>{title}</h2>
          <div className={styles.details}>
            <div style={styles.author}>
              <img src={author.avatar.url} alt='' />
              <h3>{author.name}</h3>
            </div>

            <div className={styles.date}>
              <h3>{datePublished}</h3>
            </div>
          </div>
        </div>
      </div> */}
      <div className='Card'>
        <img src={coverPhoto.url} alt='' className='img-fluid' />

        <div className='Card-body'>
          <h2>{title}</h2>
          <div>
            <Link href={'/posts/' + slug}>Read More</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogCard;
