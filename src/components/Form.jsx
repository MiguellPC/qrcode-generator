import { useState, useRef } from 'react';
import styles from './Form.module.css';
import QRcode from './QRcode.jsx';
import Tooltip from '@mui/material/Tooltip';

export default function Form() {
  const formRef = useRef();

  const [url, setUrl] = useState('');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [size, setSize] = useState('200');
  const [qrCodeData, setQrCodeData] = useState({
    url: '',
    fgColor: '',
    bgColor: '',
    size: '',
  });
  const [hasQrCode, setHasQrCode] = useState(false);

  const positionRef = useRef({
    x: 0,
    y: 0,
  });
  const popperRef = useRef(null);
  const areaRef = useRef(null);

  const handleMouseMove = (event) => {
    positionRef.current = { x: event.clientX, y: event.clientY };

    if (popperRef.current != null) {
      popperRef.current.update();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const setters = {
      url: setUrl,
      fgColor: setFgColor,
      bgColor: setBgColor,
      size: setSize,
    };

    setters[name](value);

    if (window.matchMedia('(pointer: coarse)').matches) {
      // update position on mobile devices
      positionRef.current = {
        x:
          ((window.innerWidth / 2 -
            areaRef.current.offsetLeft +
            (size * 3) / 5) /
            (areaRef.current.getBoundingClientRect().width / 100)) *
            0.71 +
          areaRef.current.getBoundingClientRect().width * 0.21,
        y: areaRef.current.getBoundingClientRect().y,
      };

      if (popperRef.current != null) {
        popperRef.current.update();
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setQrCodeData({
      ...qrCodeData,
      url: url,
      fgColor: fgColor,
      bgColor: bgColor,
      size: size,
    });
    setHasQrCode(true);
  };

  return (
    <form
      ref={formRef}
      className={styles.form}
      onSubmit={handleSubmit}>
      <div className={styles.inputs}>
        <div>
          <p>
            <img
              src="./url.svg"
              alt="url"
              width="24px"
              height="32px"
            />
            <span>Enter Url</span>
          </p>
          <input
            type="url"
            id="url"
            name="url"
            value={url}
            onChange={handleChange}
            placeholder="https://example.com"
            required
          />
        </div>
        <div>
          <p>
            <img
              src="./color.svg"
              alt="Color Palette Icon"
              width="24px"
              height="32px"
            />
            <span>Color</span>
          </p>
          <div className={styles.colorInputs}>
            <div className={styles.colorInput}>
              <span>Foreground</span>
              <input
                type="color"
                id="fgColor"
                name="fgColor"
                value={fgColor}
                onChange={handleChange}
                required
                aria-label="Foreground color selector"
              />
            </div>
            <div className={styles.colorInput}>
              <span>Background</span>
              <input
                type="color"
                id="bgColor"
                name="bgColor"
                value={bgColor}
                onChange={handleChange}
                required
                aria-label="Background color selector"
              />
            </div>
          </div>
        </div>

        <div>
          <p>
            <img
              src="./dimensions.svg"
              alt="dimensions"
              width="24px"
              height="32px"
            />
            <span>Size</span>
          </p>
          <div className={styles.rangeInput}>
            <span>Low</span>
            <Tooltip
              title={`${size} x ${size}`}
              arrow
              placement="top"
              PopperProps={{
                popperRef,
                anchorEl: {
                  getBoundingClientRect: () => {
                    return new DOMRect(
                      positionRef.current.x,
                      areaRef.current.getBoundingClientRect().y,
                      0,
                      0
                    );
                  },
                },
              }}>
              <input
                type="range"
                id="size"
                name="size"
                min="100"
                max="1000"
                ref={areaRef}
                value={size}
                onChange={handleChange}
                onMouseMove={handleMouseMove}
                required
              />
            </Tooltip>
            <span>High</span>
          </div>
        </div>
      </div>
      <div className={styles.qrCodeContainer}>
        <button type="submit" className={styles.createBtn}>
          <span>Create QR code</span>
        </button>
        {hasQrCode && <QRcode {...qrCodeData} />}
      </div>
    </form>
  );
}
