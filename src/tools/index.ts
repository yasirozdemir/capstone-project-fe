export const alertOptions: any = {
  position: "top-center",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
};

export function durationToHM(dur: string): string {
  const totalM = parseInt(dur, 10);
  const h = Math.floor(totalM / 60);
  const m = totalM % 60;
  return `${h}h ${m}m`;
}

export function fullDateToYear(date: string): string {
  const d = new Date(date);
  const y = d.getFullYear();
  return y.toString();
}

export function getAverageColorFromImage(url: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx?.drawImage(img, 0, 0);
      const imgData = ctx?.getImageData(
        0,
        0,
        canvas.width,
        canvas.height
      )?.data;
      let red = 0,
        green = 0,
        blue = 0,
        alpha = 0;
      if (imgData) {
        for (let i = 0; i < imgData.length; i += 4) {
          red += imgData[i];
          green += imgData[i + 1];
          blue += imgData[i + 2];
          alpha += imgData[i + 3];
        }
        const pixel = imgData.length / 4;
        const avRed = red / pixel;
        const avGreen = green / pixel;
        const avBlue = blue / pixel;
        const avAlpha = alpha / pixel;
        const avColor = {
          red: avRed,
          green: avGreen,
          blue: avBlue,
          alpha: avAlpha,
        };
        resolve(avColor);
      }
    };
    img.onerror = reject;
  });
}

export interface IColor {
  red: number;
  green: number;
  blue: number;
  alpha: number;
}

export function colorToRgba(color: IColor): string {
  const { red, green, blue, alpha } = color;
  return `rgba(${red}, ${green}, ${blue}, ${alpha / 255})`;
}

export function createGradient(colors: string[]): string {
  const gradientColors = colors.join(",");
  return `linear-gradient(to bottom, ${gradientColors})`;
}
