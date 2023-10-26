import { useEffect, useState } from 'react';

import styles from './QRcode.module.css';
import Loading from './Loading';

export default function QRcode({ size, url, fgColor, bgColor }) {
  const [loading, setLoading] = useState(false);

  const formats = [
    {
      name: 'png',
      title: 'PNG',
    },
    {
      name: 'jpg',
      title: 'JPG',
    },
    {
      name: 'svg',
      title: 'SVG',
    },
  ];

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading ? (
        <div className={styles.loadingContainer}>
          <Loading />
        </div>
      ) : (
        <div>
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${url}&color=${fgColor.slice(
              1
            )}&bgcolor=${bgColor.slice(1)}`}
          />
          <div className={styles.downloadContainer}>
            <p>
              <img src="./download.svg" alt="download" />
              <span>DOWNLOAD IN</span>
            </p>
            <div>
              {formats.map((item) => {
                return (
                  <a
                    key={item.name}
                    href={`https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${url}&color=${fgColor.slice(
                      1
                    )}&bgcolor=${bgColor.slice(1)}&format=${
                      item.name
                    }&download=true}`}>
                    <span>{item.title}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
